
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Show toast notification
    toast({
      title: 'Authentication required',
      description: 'Please log in to access this page',
      variant: 'destructive',
    });
    
    // Redirect to login page with the return URL
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // If a specific role is required, check user role
  if (requiredRole && user.role !== requiredRole) {
    toast({
      title: 'Access Denied',
      description: `You need ${requiredRole} access to view this page`,
      variant: 'destructive',
    });
    
    // Redirect to appropriate dashboard or home page
    const redirectPath = user.role === 'donor' ? '/donor/dashboard' : 
                         user.role === 'hospital' ? '/hospital/dashboard' : '/';
    return <Navigate to={redirectPath} replace />;
  }

  // If authenticated (and has required role, if specified), render the children
  return children;
};

export default ProtectedRoute;
