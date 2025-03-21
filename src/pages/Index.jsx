
import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import Statistics from "@/components/Statistics";
import HowItWorks from "@/components/HowItWorks";
import CTASection from "@/components/CTASection";
import BloodCompatibilityChart from "@/components/BloodCompatibilityChart";
import CampaignsAndEvents from "@/components/CampaignsAndEvents";
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
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        <BloodCompatibilityChart />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <CampaignsAndEvents />
      </div>
      
      <CTASection />
    </Layout>
  );
};

export default Index;
