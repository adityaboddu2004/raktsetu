
import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import Statistics from "@/components/Statistics";
import HowItWorks from "@/components/HowItWorks";
import CTASection from "@/components/CTASection";
import BloodCompatibilityChart from "@/components/BloodCompatibilityChart";

const Index = () => {
  return (
    <Layout>
      <Hero />
      
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
              Find out which blood types are compatible with yours. Click on any blood type to see who you can donate to and receive from.
            </p>
          </div>
          <BloodCompatibilityChart />
        </div>
      </div>
      
      <CTASection />
    </Layout>
  );
};

export default Index;
