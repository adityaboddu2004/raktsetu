
import { createContext, useContext } from 'react';
import { useAuthState } from '@/hooks/useAuthState';
import { useAuthMethods } from '@/hooks/useAuthMethods';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  // Use our custom hooks to manage auth state and methods
  const { 
    user, 
    setUser, 
    isLoading, 
    setIsLoading, 
    authToken, 
    setAuthToken 
  } = useAuthState();

  const { 
    login, 
    register, 
    logout, 
    updateUserProfile 
  } = useAuthMethods(user, setUser, authToken, setAuthToken, setIsLoading);

  // Build the auth context value object
  const value = {
    user,
    authToken,
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
