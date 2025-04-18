
import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Hospital, Droplet, User } from 'lucide-react';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('donor');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Get the redirect path from location state or default to dashboard
  const from = location.state?.from || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Attempt to login with the provided credentials
      const user = await login(emailOrUsername, password);
      
      toast({
        title: 'Login successful',
        description: `Welcome back, ${user.name}! You are now logged in.`,
      });
      
      // Redirect based on role or return URL
      if (from !== '/') {
        navigate(from);
      } else if (user.role === 'hospital') {
        navigate('/hospital/dashboard');
      } else {
        navigate('/donor/dashboard');
      }
    } catch (error) {
      console.error(error);
      
      toast({
        title: 'Login failed',
        description: error.message || 'Please check your credentials and try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-background pt-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 py-12 md:py-16">
          <div className="text-center mb-8 animate-reveal">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your RaktSetu account</p>
          </div>

          <div className="glass-card p-6 animate-reveal">
            <div className="flex justify-center mb-6 space-x-4">
              <button
                type="button"
                onClick={() => setRole('donor')}
                className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
                  role === 'donor' ? 'bg-blood/10 border border-blood' : 'bg-secondary hover:bg-blood/5'
                }`}
              >
                <Droplet size={24} className={role === 'donor' ? 'text-blood' : 'text-muted-foreground'} />
                <span className={`mt-2 font-medium ${role === 'donor' ? 'text-blood' : 'text-muted-foreground'}`}>
                  Donor
                </span>
              </button>
              
              <button
                type="button"
                onClick={() => setRole('hospital')}
                className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
                  role === 'hospital' ? 'bg-blood/10 border border-blood' : 'bg-secondary hover:bg-blood/5'
                }`}
              >
                <Hospital size={24} className={role === 'hospital' ? 'text-blood' : 'text-muted-foreground'} />
                <span className={`mt-2 font-medium ${role === 'hospital' ? 'text-blood' : 'text-muted-foreground'}`}>
                  Hospital
                </span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="emailOrUsername" className="text-sm font-medium text-muted-foreground mb-1">
                  Email or Username
                </Label>
                <Input
                  id="emailOrUsername"
                  type="text"
                  placeholder="Enter your email or username"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="password" className="text-sm font-medium text-muted-foreground mb-1">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  required
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blood focus:ring-blood"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-muted-foreground">
                    Remember me
                  </label>
                </div>
                
                <a href="#" className="text-sm font-medium text-blood hover:underline">
                  Forgot password?
                </a>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                <div className="flex">
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <strong>Demo Account:</strong> Use username <strong>testuser</strong> with password <strong>password123</strong> to log in
                    </p>
                  </div>
                </div>
              </div>
              
              <Button
                type="submit"
                variant="primary"
                className="w-full mt-6"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-blood hover:underline">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
