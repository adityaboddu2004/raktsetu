
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Droplet } from "lucide-react";
import { Button } from "@/components/ui/button";

const BloodCompatibilityChart = () => {
  const [selectedBloodType, setSelectedBloodType] = useState<string | null>(null);
  const [view, setView] = useState<'donate' | 'receive'>('donate');
  
  // Blood compatibility data
  const compatibility = {
    donate: {
      'O-': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
      'O+': ['O+', 'A+', 'B+', 'AB+'],
      'A-': ['A-', 'A+', 'AB-', 'AB+'],
      'A+': ['A+', 'AB+'],
      'B-': ['B-', 'B+', 'AB-', 'AB+'],
      'B+': ['B+', 'AB+'],
      'AB-': ['AB-', 'AB+'],
      'AB+': ['AB+'],
    },
    receive: {
      'O-': ['O-'],
      'O+': ['O-', 'O+'],
      'A-': ['O-', 'A-'],
      'A+': ['O-', 'O+', 'A-', 'A+'],
      'B-': ['O-', 'B-'],
      'B+': ['O-', 'O+', 'B-', 'B+'],
      'AB-': ['O-', 'A-', 'B-', 'AB-'],
      'AB+': ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
    }
  };
  
  const bloodTypes = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

  const handleBloodTypeClick = (bloodType: string) => {
    setSelectedBloodType(bloodType);
  };
  
  const toggleView = () => {
    setView(view === 'donate' ? 'receive' : 'donate');
  };
  
  return (
    <Card className="shadow-sm">
      <CardContent className="pt-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            {selectedBloodType ? 
              `Blood Type ${selectedBloodType} Compatibility` : 
              "Select your blood type to see compatibility"}
          </h3>
          {!selectedBloodType && (
            <p className="text-sm text-muted-foreground">
              Click on any blood type below to see detailed compatibility information
            </p>
          )}
          
          {selectedBloodType && (
            <div className="flex justify-center gap-4 mb-4">
              <Button 
                variant={view === 'donate' ? "default" : "outline"}
                onClick={() => setView('donate')}
                size="sm"
                className={`${view === 'donate' ? 'bg-blood hover:bg-blood-hover' : ''}`}
              >
                Can donate to
              </Button>
              
              <Button 
                variant={view === 'receive' ? "default" : "outline"}
                onClick={() => setView('receive')}
                size="sm"
                className={`${view === 'receive' ? 'bg-blood hover:bg-blood-hover' : ''}`}
              >
                Can receive from
              </Button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {bloodTypes.map((bloodType) => {
            const isSelected = bloodType === selectedBloodType;
            let isCompatible = false;
            
            if (selectedBloodType) {
              const compatibleTypes = compatibility[view][selectedBloodType] || [];
              isCompatible = compatibleTypes.includes(bloodType);
            }
            
            return (
              <button
                key={bloodType}
                onClick={() => handleBloodTypeClick(bloodType)}
                className={`border rounded-lg p-4 flex flex-col items-center justify-center transition-all
                  ${isSelected ? 'ring-2 ring-blood' : ''}
                  ${selectedBloodType ? 
                    (isCompatible || isSelected
                      ? 'bg-green-50 border-green-200 text-green-600' 
                      : 'bg-gray-50 border-gray-200 text-gray-400')
                    : 'bg-white hover:bg-red-50 border-gray-200 hover:border-blood/30 hover:shadow-md'
                  }
                `}
              >
                <div className="flex items-center justify-center mb-2">
                  <Droplet 
                    size={24} 
                    className={`mr-2 ${selectedBloodType ? (isCompatible || isSelected ? 'text-blood' : 'text-gray-300') : 'text-blood'}`} 
                    fill={selectedBloodType ? (isCompatible || isSelected ? '#fadcdc' : 'none') : '#fadcdc'}
                  />
                  <span className="text-2xl font-bold">{bloodType}</span>
                </div>
                
                <div className="text-xs mt-1 text-center">
                  {selectedBloodType ? (
                    isSelected ? (
                      <span className="font-medium">Your Blood Type</span>
                    ) : isCompatible ? (
                      <span className="font-medium">
                        {view === 'donate' ? 'Can Receive' : 'Can Donate'}
                      </span>
                    ) : (
                      <span>Not Compatible</span>
                    )
                  ) : (
                    <span className="font-medium">Select</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
        
        <div className="mt-6 text-sm text-muted-foreground">
          <p className="mb-1">Important notes:</p>
          <ul className="list-disc list-inside">
            <li>O- is the universal donor (can donate to all blood types)</li>
            <li>AB+ is the universal recipient (can receive from all blood types)</li>
            <li>Always consult with medical professionals before blood donation or transfusion</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default BloodCompatibilityChart;
