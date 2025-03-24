
import { useState, useEffect } from 'react';
import { verifyToken } from '@/db/mongodb';

/**
 * Hook to manage authentication state
 * Handles user state, loading state, and auth token
 */
export const useAuthState = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    // Check localStorage for JWT token on initial load
    const token = localStorage.getItem('authToken');
    
    if (token) {
      // Verify the token
      const decodedUser = verifyToken(token);
      
      if (decodedUser) {
        setUser(decodedUser);
        setAuthToken(token);
      } else {
        // Token is invalid or expired
        localStorage.removeItem('authToken');
      }
    }
    
    setIsLoading(false);
  }, []);

  return { 
    user, 
    setUser, 
    isLoading, 
    setIsLoading, 
    authToken, 
    setAuthToken 
  };
};
