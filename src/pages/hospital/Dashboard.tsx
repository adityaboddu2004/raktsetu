
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Plus, Search, ChevronRight, Droplet, Users, AlertTriangle } from 'lucide-react';
import Button from '@/components/Button';
import { useAuth } from '@/contexts/AuthContext';

// Mock hospital data
const hospitalStats = {
  totalRequests: 24,
  activeRequests: 8,
  donorsFound: 18,
  urgentNeeds: 3
};

// Mock request data
interface BloodRequest {
  id: string;
  bloodGroup: string;
  requiredUnits: number;
  requestDate: string;
  status: 'pending' | 'fulfilled' | 'expired';
  isUrgent: boolean;
  donorsResponded: number;
}

const mockRequests: BloodRequest[] = [
  {
    id: '1',
    bloodGroup: 'A+',
    requiredUnits: 2,
    requestDate: '2023-06-10',
    status: 'fulfilled',
    isUrgent: false,
    donorsResponded: 4
  },
  {
    id: '2',
    bloodGroup: 'O-',
    requiredUnits: 3,
    requestDate: '2023-06-15',
    status: 'pending',
    isUrgent: true,
    donorsResponded: 1
  },
  {
    id: '3',
    bloodGroup: 'B+',
    requiredUnits: 1,
    requestDate: '2023-06-18',
    status: 'pending',
    isUrgent: false,
    donorsResponded: 0
  },
  {
    id: '4',
    bloodGroup: 'AB+',
    requiredUnits: 2,
    requestDate: '2023-06-05',
    status: 'expired',
    isUrgent: true,
    donorsResponded: 0
  }
];

const HospitalDashboard = () => {
  const { user, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();
  const [requests, setRequests] = useState<BloodRequest[]>([]);
  
  useEffect(() => {
    // Redirect if not authenticated or not a hospital
    if (!isAuthenticated || role !== 'hospital') {
      navigate('/login');
      return;
    }
    
    // Load requests (mock data for now)
    setRequests(mockRequests);
  }, [isAuthenticated, role, navigate]);

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'fulfilled':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Hospital Dashboard</h1>
              <p className="text-muted mt-1">Manage your blood requests and find donors</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <Button
                variant="secondary"
                onClick={() => navigate('/find-donor')}
              >
                <Search size={18} className="mr-2" />
                Find Donors
              </Button>
              <Button
                variant="primary"
                onClick={() => navigate('/hospital/emergency-request')}
              >
                <Plus size={18} className="mr-2" />
                New Request
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted text-sm">Total Requests</p>
                  <h3 className="text-2xl font-bold mt-1">{hospitalStats.totalRequests}</h3>
                </div>
                <div className="bg-blood-light p-3 rounded-full">
                  <Droplet size={24} className="text-blood" />
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted text-sm">Active Requests</p>
                  <h3 className="text-2xl font-bold mt-1">{hospitalStats.activeRequests}</h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Search size={24} className="text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted text-sm">Donors Found</p>
                  <h3 className="text-2xl font-bold mt-1">{hospitalStats.donorsFound}</h3>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Users size={24} className="text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="glass-card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted text-sm">Urgent Needs</p>
                  <h3 className="text-2xl font-bold mt-1">{hospitalStats.urgentNeeds}</h3>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <AlertTriangle size={24} className="text-yellow-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Requests */}
          <div className="glass-card p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Blood Requests</h2>
              <Button
                variant="ghost"
                className="text-sm flex items-center"
                onClick={() => navigate('/hospital/all-requests')}
              >
                View all
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Blood Group
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Units
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Donors
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {requests.map((request) => (
                    <tr key={request.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            request.isUrgent ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {request.bloodGroup}
                          </div>
                          {request.isUrgent && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                              Urgent
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{request.requiredUnits} units</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{request.requestDate}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(request.status)}`}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {request.donorsResponded} responded
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Button variant="ghost" size="sm" className="text-blood">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HospitalDashboard;
