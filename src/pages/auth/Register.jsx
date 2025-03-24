
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import RoleSelector from '@/components/auth/RoleSelector';
import RegisterForm from '@/components/auth/RegisterForm';
import { validateRegistrationForm } from '@/utils/formValidation';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('donor');
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState({});
  
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateRegistrationForm(name, email, password, confirmPassword, agreeToTerms);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    
    setIsLoading(true);

    try {
      await register(email, password, name, role);
      toast({
        title: 'Registration successful',
        description: `Your ${role} account has been created successfully.`,
      });
      
      // Redirect based on role
      if (role === 'hospital') {
        navigate('/hospital/dashboard');
      } else {
        navigate('/donor/dashboard');
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Registration failed',
        description: error.message || 'There was an error creating your account. Please try again.',
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
            <h1 className="text-3xl font-bold mb-2">Create an Account</h1>
            <p className="text-muted-foreground">Join RaktSetu and help save lives</p>
          </div>

          <div className="glass-card p-6 animate-reveal">
            <RoleSelector role={role} setRole={setRole} />
            
            <RegisterForm 
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              agreeToTerms={agreeToTerms}
              setAgreeToTerms={setAgreeToTerms}
              errors={errors}
              isLoading={isLoading}
              handleSubmit={handleSubmit}
              role={role}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
