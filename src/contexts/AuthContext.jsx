
import { createContext, useContext, useState, useEffect } from 'react';
import { getUsersCollection } from '@/db/mongodb';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for user data on initial load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password, role) => {
    setIsLoading(true);
    try {
      // Get the users collection from MongoDB
      const usersCollection = await getUsersCollection();
      
      // Find the user with the given email
      const existingUser = await usersCollection.findOne({ email });
      
      if (existingUser) {
        // In a real app, you would check password hash here
        // For simplicity, we're just checking if the user exists
        
        const userObject = {
          id: existingUser._id.toString(),
          email: existingUser.email,
          name: existingUser.name,
          role: existingUser.role,
          profile: existingUser.profile || {},
          bloodGroup: existingUser.bloodGroup,
          location: existingUser.location,
          gender: existingUser.gender,
          phone: existingUser.phone,
          isVerified: existingUser.isVerified || false
        };
        
        setUser(userObject);
        localStorage.setItem('user', JSON.stringify(userObject));
        return userObject;
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, password, name, role) => {
    setIsLoading(true);
    try {
      // Get the users collection from MongoDB
      const usersCollection = await getUsersCollection();
      
      // Check if user already exists
      const existingUser = await usersCollection.findOne({ email });
      
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
      
      // Create a new user document
      const newUser = {
        email,
        name,
        role,
        profile: {},
        isVerified: false,
        createdAt: new Date()
      };
      
      // Insert the new user into the collection
      const result = await usersCollection.insertOne(newUser);
      
      if (!result.insertedId) {
        throw new Error('Failed to create user');
      }
      
      // Set the current user object
      const userObject = {
        id: result.insertedId.toString(),
        ...newUser
      };
      
      setUser(userObject);
      localStorage.setItem('user', JSON.stringify(userObject));
      
      return userObject;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (profileData) => {
    if (!user) return;

    try {
      // Get the users collection from MongoDB
      const usersCollection = await getUsersCollection();
      
      // Update the user in the database
      const updatedUser = {
        ...user,
        ...profileData,
        profile: {
          ...(user.profile || {}),
          ...(profileData.profile || {})
        }
      };
      
      await usersCollection.updateOne(
        { email: user.email },
        { $set: updatedUser }
      );
      
      // Update local state
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return updatedUser;
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    role: user?.role || null,
    isVerified: user?.isVerified || false,
    login,
    register,
    logout,
    updateUserProfile
  };

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
