
import { useState, useEffect } from 'react';
import { Droplet, AlertTriangle, Check, Loader } from 'lucide-react';
import Button from '../Button';
import { useToast } from '@/hooks/use-toast';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const generateMockInventory = () => {
  return bloodGroups.map(group => ({
    bloodGroup: group,
    units: Math.floor(Math.random() * 20) + 1,
    status: getStatus(Math.floor(Math.random() * 20) + 1),
    lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0]
  }));
};

const getStatus = (units) => {
  if (units <= 3) return 'critical';
  if (units <= 7) return 'low';
  return 'normal';
};

const BloodInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate fetching inventory data
    setTimeout(() => {
      setInventory(generateMockInventory());
      setLoading(false);
    }, 1000);
  }, []);

  const handleUpdateInventory = (bloodGroup, change) => {
    setUpdating(true);
    // Simulate API call
    setTimeout(() => {
      setInventory(prev => 
        prev.map(item => 
          item.bloodGroup === bloodGroup 
            ? { 
                ...item, 
                units: Math.max(0, item.units + change),
                lastUpdated: new Date().toISOString().split('T')[0],
                status: getStatus(Math.max(0, item.units + change))
              } 
            : item
        )
      );
      setUpdating(false);
      
      toast({
        title: `${bloodGroup} inventory updated`,
        description: change > 0 
          ? `Added ${change} unit(s) to inventory` 
          : `Removed ${Math.abs(change)} unit(s) from inventory`,
        variant: "default",
      });
    }, 800);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'low': return 'bg-yellow-100 text-yellow-800';
      case 'normal': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'critical': return <AlertTriangle size={16} className="mr-1" />;
      case 'low': return <AlertTriangle size={16} className="mr-1" />;
      case 'normal': return <Check size={16} className="mr-1" />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader size={30} className="animate-spin text-blood" />
        <span className="ml-2 text-muted">Loading inventory...</span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Blood Inventory Management</h2>
        <p className="text-muted text-sm">Track and manage your hospital's blood supply</p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Blood Group
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Units Available
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inventory.map((item) => (
              <tr key={item.bloodGroup}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3">
                      <Droplet size={16} className="text-blood" />
                    </div>
                    <span className="font-medium">{item.bloodGroup}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-lg font-semibold">{item.units}</span> units
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full items-center ${getStatusColor(item.status)}`}>
                    {getStatusIcon(item.status)}
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.lastUpdated}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleUpdateInventory(item.bloodGroup, 1)}
                      disabled={updating}
                      className="border border-gray-300"
                    >
                      +1
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleUpdateInventory(item.bloodGroup, -1)}
                      disabled={updating || item.units === 0}
                      className="border border-gray-300"
                    >
                      -1
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Need to request emergency blood?</h3>
        <p className="text-sm text-muted mb-4">If your inventory is low, you can send emergency requests to nearby donors</p>
        <Button variant="primary">
          Create Emergency Request
        </Button>
      </div>
    </div>
  );
};

export default BloodInventory;
