
import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import Statistics from "@/components/Statistics";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import BloodCompatibilityChart from "@/components/BloodCompatibilityChart";
import { Link } from "react-router-dom";
import { LogIn, UserPlus } from "lucide-react";
import Button from "@/components/Button";

const Index = () => {
  return (
    <Layout>
      <Hero />
      
      {/* Quick login/signup buttons */}
      <div className="max-w-7xl mx-auto px-4 py-8 flex justify-center gap-6">
        <Link to="/login">
          <Button variant="secondary" size="lg" className="font-medium flex items-center">
            <LogIn size={18} className="mr-2" />
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button variant="primary" size="lg" className="font-medium flex items-center">
            <UserPlus size={18} className="mr-2" />
            Sign Up
          </Button>
        </Link>
      </div>
      
      <Statistics />
      <HowItWorks />
      
      {/* Blood Compatibility Section */}
      <div className="bg-red-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">
              <span className="text-blood">Blood Compatibility</span> Chart
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Find out which blood types are compatible with yours. Select your blood type and see who you can donate to and receive from.
            </p>
          </div>
          <BloodCompatibilityChart />
        </div>
      </div>
      
      <Testimonials />
      <CTASection />
    </Layout>
  );
};

export default Index;
