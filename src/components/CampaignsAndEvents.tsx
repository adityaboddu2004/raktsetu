
import { useState } from 'react';
import { Search, Calendar, MapPin, Clock, Plus } from 'lucide-react';
import Button from '@/components/Button';
import { Card, CardContent } from "@/components/ui/card";
import { toast } from 'sonner';

// Mock event data
const mockEvents = [
  {
    id: 1,
    title: 'Delhi University Blood Drive',
    description: 'Annual blood donation camp organized by the Delhi University in collaboration with Indian Red Cross Society. All donors will receive refreshments and a certificate.',
    date: '2023-08-15',
    formattedDate: 'Tuesday, August 15, 2023',
    time: '10:00 AM - 4:00 PM',
    location: 'Delhi University, North Campus',
    image: '/public/lovable-uploads/3271c298-c544-4825-bf16-5d54850c0322.png'
  },
  {
    id: 2,
    title: 'TechCorp Donation Drive',
    description: 'TechCorp is organizing a blood donation drive for all employees and nearby residents as part of their CSR initiative.',
    date: '2023-08-22',
    formattedDate: 'Tuesday, August 22, 2023',
    time: '9:00 AM - 5:00 PM',
    location: 'TechCorp Headquarters',
    image: '/public/lovable-uploads/91db0d9c-88b8-4728-bbfe-b0b99a20f80c.png'
  },
  {
    id: 3,
    title: 'Community Blood Camp - Malviya Nagar',
    description: 'A community blood donation camp organized by local residents to help stock the blood banks during the festival season.',
    date: '2023-08-28',
    formattedDate: 'Monday, August 28, 2023',
    time: '8:00 AM - 2:00 PM',
    location: 'Malviya Nagar Community Center',
    image: '/public/lovable-uploads/5e5faeba-0373-4ee9-b4b4-14b53f770b94.png'
  }
];

const CampaignsAndEvents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [events, setEvents] = useState(mockEvents);
  
  const filteredEvents = events.filter(event => 
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleOrganizeEvent = () => {
    toast.info("Event organization form will be available soon!");
  };
  
  return (
    <div className="space-y-8">
      <div className="bg-red-50 py-12 px-4 rounded-lg">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-xl font-medium text-blood mb-2">Campaigns & Activities</h2>
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-gray-800">Upcoming</span>{" "}
            <span className="text-blood">Blood Donation</span>{" "}
            <span className="text-gray-800">Events</span>
          </h1>
          <p className="text-gray-600 mb-8">
            Join blood donation drives and campaigns happening near you. Together, we can save lives.
          </p>
          <Button 
            variant="primary" 
            className="inline-flex items-center"
            onClick={handleOrganizeEvent}
          >
            <Plus size={18} className="mr-2" />
            Request to Organize Event
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-stretch">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search by event name, location or city..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-blood"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="md:w-[240px]">
          <button className="flex items-center justify-between w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-700 hover:border-gray-300">
            <span>All Event Types</span>
            <svg className="w-5 h-5 ml-2 -mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
      
      <div className="flex items-center text-sm text-gray-500">
        <span>{filteredEvents.length} events found</span>
        <div className="ml-auto flex items-center">
          <MapPin size={16} className="mr-1" />
          <span>Showing events across all locations</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-48 overflow-hidden">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white py-1 px-2 rounded text-sm font-medium">
                {new Date(event.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}
              </div>
            </div>
            <CardContent className="p-5">
              <h3 className="text-lg font-bold mb-2">{event.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{event.description}</p>
              
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2 text-blood" />
                  <span>{event.formattedDate}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-2 text-blood" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2 text-blood" />
                  <span>{event.location}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                <Button variant="secondary" size="sm">View Details</Button>
                <Button variant="primary" size="sm">Register</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CampaignsAndEvents;
