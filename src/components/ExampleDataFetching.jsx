
import React, { useEffect, useState } from 'react';
import { donorAPI, hospitalAPI } from '../utils/apiUtils';
import { toast } from '@/hooks/use-toast';

const ExampleDataFetching = () => {
  const [donors, setDonors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch donors and hospitals in parallel
        const [donorsData, hospitalsData] = await Promise.all([
          donorAPI.getAllDonors(),
          hospitalAPI.getAllHospitals()
        ]);
        
        setDonors(donorsData);
        setHospitals(hospitalsData);
        
        toast({
          title: 'Data loaded successfully',
          description: 'Using simulated data for development',
        });
        
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again later.');
        
        toast({
          title: 'Error loading data',
          description: 'Could not connect to the database',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading data...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  // Add sample data for development if empty
  if (donors.length === 0 && hospitals.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="mb-4">No data found. This is using a simulated database for development.</p>
        <p className="text-muted-foreground">In production, this would connect to your MongoDB database.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="glass-card p-4">
        <h2 className="text-xl font-semibold mb-4">Registered Donors</h2>
        {donors.length === 0 ? (
          <p>No donors found.</p>
        ) : (
          <ul className="divide-y">
            {donors.map(donor => (
              <li key={donor._id} className="py-2">
                <p className="font-medium">{donor.name}</p>
                <p className="text-sm text-muted">Blood Group: {donor.bloodGroup}</p>
                <p className="text-sm text-muted">Location: {donor.location}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className="glass-card p-4">
        <h2 className="text-xl font-semibold mb-4">Registered Hospitals</h2>
        {hospitals.length === 0 ? (
          <p>No hospitals found.</p>
        ) : (
          <ul className="divide-y">
            {hospitals.map(hospital => (
              <li key={hospital._id} className="py-2">
                <p className="font-medium">{hospital.name}</p>
                <p className="text-sm text-muted">Location: {hospital.location}</p>
                <p className="text-sm text-muted">Contact: {hospital.contactNumber}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ExampleDataFetching;
