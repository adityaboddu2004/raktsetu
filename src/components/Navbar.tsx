
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "./Button";
import { useAuth } from "@/contexts/AuthContext";
import { MobileNavigation } from "./navbar/mobile-navigation";
import { UserMenu } from "./navbar/user-menu";
import { getMainNavigation } from "./navbar/navigation-utils";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, role, logout } = useAuth();
  
  const navigation = getMainNavigation(role);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <nav 
      className={cn(
        "fixed w-full top-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/90 backdrop-blur-lg shadow-sm py-3" : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link 
              to="/"
              className="text-2xl font-bold text-blood tracking-tight flex items-center"
            >
              <span className="mr-1">Rakt</span>
              <span className="text-foreground">Setu</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-all",
                  "hover:text-blood hover:scale-105 duration-300",
                  location.pathname === item.path 
                    ? "text-blood" 
                    : "text-foreground/80"
                )}
              >
                {item.name}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <UserMenu 
                isOpen={isUserMenuOpen}
                onToggle={toggleUserMenu}
                onLogout={handleLogout}
              />
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex items-center"
                  >
                    <LogIn size={16} className="mr-1" />
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    variant="primary" 
                    size="sm"
                    className="flex items-center"
                  >
                    <UserPlus size={16} className="mr-1" />
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
            
            {role === "hospital" && (
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => navigate('/hospital/emergency-request')}
              >
                Emergency Need
              </Button>
            )}
          </div>
          
          {/* Mobile navigation toggle */}
          <div className="flex md:hidden">
            {!isAuthenticated && (
              <div className="flex items-center space-x-2 mr-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="p-1">
                    <LogIn size={20} />
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="ghost" size="sm" className="p-1">
                    <UserPlus size={20} />
                  </Button>
                </Link>
              </div>
            )}
            <button
              type="button"
              className="p-2 -m-2 text-gray-500 rounded-md"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {isMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      <MobileNavigation 
        isMenuOpen={isMenuOpen}
        onLogout={handleLogout}
      />
    </nav>
  );
};

export default Navbar;
