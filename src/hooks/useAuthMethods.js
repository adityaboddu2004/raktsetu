
import { 
  getUsersCollection, 
  hashPassword, 
  comparePasswords, 
  generateToken 
} from '@/db/mongodb';

/**
 * Hook to provide authentication methods
 * Handles login, register, logout, and profile update
 */
export const useAuthMethods = (user, setUser, authToken, setAuthToken, setIsLoading) => {
  const login = async (emailOrUsername, password) => {
    setIsLoading(true);
    try {
      // Get the users collection from MongoDB
      const usersCollection = await getUsersCollection();
      
      // Check if input is email or username
      const isEmail = emailOrUsername.includes('@');
      
      // Find the user with the given email or username
      let existingUser;
      if (isEmail) {
        existingUser = await usersCollection.findOne({ email: emailOrUsername });
      } else {
        existingUser = await usersCollection.findOne({ username: emailOrUsername });
      }
      
      if (!existingUser) {
        throw new Error('Invalid credentials');
      }
      
      // Verify password
      const isPasswordValid = await comparePasswords(password, existingUser.password);
      
      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }
      
      const userObject = {
        id: existingUser._id.toString(),
        email: existingUser.email,
        username: existingUser.username,
        name: existingUser.name,
        role: existingUser.role,
        profile: existingUser.profile || {},
        bloodGroup: existingUser.bloodGroup,
        location: existingUser.location,
        gender: existingUser.gender,
        phone: existingUser.phone,
        isVerified: existingUser.isVerified || false
      };
      
      // Generate JWT token
      const token = generateToken(userObject);
      
      setUser(userObject);
      setAuthToken(token);
      localStorage.setItem('authToken', token);
      
      return userObject;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, password, name, role, username) => {
    setIsLoading(true);
    try {
      // Get the users collection from MongoDB
      const usersCollection = await getUsersCollection();
      
      // Check if username already exists
      if (username) {
        const existingUsername = await usersCollection.findOne({ username });
        if (existingUsername) {
          throw new Error('Username is already taken');
        }
      }
      
      // Check if email already exists
      const existingUser = await usersCollection.findOne({ email });
      
      if (existingUser) {
        throw new Error('User with this email already exists');
      }
      
      // Hash the password
      const hashedPassword = await hashPassword(password);
      
      // Create a new user document
      const newUser = {
        email,
        password: hashedPassword,
        name,
        role,
        username,
        profile: {},
        isVerified: false,
        createdAt: new Date()
      };
      
      // Insert the new user into the collection
      const result = await usersCollection.insertOne(newUser);
      
      if (!result.insertedId) {
        throw new Error('Failed to create user');
      }
      
      // Set the current user object (without the password)
      const userObject = {
        id: result.insertedId.toString(),
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        username: newUser.username,
        isVerified: newUser.isVerified
      };
      
      // Generate JWT token
      const token = generateToken(userObject);
      
      setUser(userObject);
      setAuthToken(token);
      localStorage.setItem('authToken', token);
      
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
      
      // Update JWT token with new user data
      const token = generateToken(updatedUser);
      setAuthToken(token);
      localStorage.setItem('authToken', token);
      
      return updatedUser;
    } catch (error) {
      console.error('Profile update failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem('authToken');
  };

  return {
    login,
    register,
    logout,
    updateUserProfile
  };
};
