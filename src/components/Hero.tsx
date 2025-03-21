
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "./Button";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-16 md:pt-24 hero-section">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 opacity-10 blur-3xl">
          <svg 
            width="800" 
            height="800" 
            viewBox="0 0 100 100" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="40" fill="#E63946" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 -z-10 opacity-10 blur-3xl">
          <svg 
            width="600" 
            height="600" 
            viewBox="0 0 100 100" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="40" fill="#E63946" />
          </svg>
        </div>
      </div>
      
      {/* Hero content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-center">
            <div className="animate-reveal">
              <div className="rounded-full inline-flex items-center px-3 py-1 text-sm font-medium bg-blood-50 text-blood mb-6">
                <span className="flex h-2 w-2 rounded-full bg-blood mr-2"></span>
                Save Lives. Donate Blood.
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
                Bridging Gaps, <span className="text-gradient">Saving Lives</span>
              </h1>
              <p className="text-lg text-muted mb-8 max-w-lg text-balance leading-relaxed">
                Connect with blood donors and recipients seamlessly through RaktSetu's platform. Every donation is an opportunity to save a life.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/find-donor">
                  <Button size="lg" variant="primary" className="font-medium">
                    Find a Donor <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>
                <Link to="/become-donor">
                  <Button size="lg" variant="secondary" className="font-medium">
                    Become a Donor
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative animate-reveal">
              <div className="relative overflow-hidden rounded-2xl shadow-glass-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-blood-20 to-blood-10 z-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Blood donation" 
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 -z-10 blur-2xl opacity-20 rounded-full h-64 w-64 bg-blood animate-pulse-slow"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
