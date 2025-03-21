
import Layout from "@/components/Layout";
import BloodCompatibilityChart from "@/components/BloodCompatibilityChart";
import CampaignsAndEvents from "@/components/CampaignsAndEvents";

const EventsAndCampaigns = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <BloodCompatibilityChart />
        
        <div className="mt-12">
          <CampaignsAndEvents />
        </div>
      </div>
    </Layout>
  );
};

export default EventsAndCampaigns;
