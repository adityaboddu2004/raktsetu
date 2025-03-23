
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Droplet } from "lucide-react";

const BloodCompatibilityChart = () => {
  const [view, setView] = useState<'donate' | 'receive'>('donate');
  const [selectedBloodType, setSelectedBloodType] = useState<string>('A+');
  
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
  
  const isCompatible = (bloodType: string) => {
    if (view === 'donate') {
      return selectedBloodType === bloodType || compatibility.donate[selectedBloodType].includes(bloodType);
    } else {
      return selectedBloodType === bloodType || compatibility.receive[selectedBloodType].includes(bloodType);
    }
  };
  
  const getCompatibilityLabel = () => {
    if (view === 'donate') {
      return `Blood type ${selectedBloodType} can donate to:`;
    } else {
      return `Blood type ${selectedBloodType} can receive from:`;
    }
  };
  
  return (
    <Card className="shadow-sm">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold">Blood Compatibility Chart</h2>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Select value={selectedBloodType} onValueChange={setSelectedBloodType}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select blood type" />
              </SelectTrigger>
              <SelectContent>
                {bloodTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Tabs defaultValue="donate" className="w-full sm:w-[400px]" onValueChange={(value) => setView(value as 'donate' | 'receive')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="donate">Can donate to</TabsTrigger>
                <TabsTrigger value="receive">Can receive from</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-lg font-medium text-gray-700">{getCompatibilityLabel()}</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {bloodTypes.map((bloodType) => {
            const compatible = isCompatible(bloodType);
            const isSelected = bloodType === selectedBloodType;
            
            return (
              <div 
                key={bloodType}
                className={`border rounded-lg p-4 flex flex-col items-center justify-center transition-all
                  ${isSelected ? 'ring-2 ring-blood' : ''}
                  ${compatible 
                    ? 'bg-green-50 border-green-200 text-green-600' 
                    : 'bg-gray-50 border-gray-200 text-gray-400'
                  }
                  ${compatible ? 'hover:shadow-md' : ''}
                `}
              >
                <div className="flex items-center justify-center mb-2">
                  <Droplet 
                    size={24} 
                    className={`mr-2 ${compatible ? 'text-blood' : 'text-gray-300'}`} 
                    fill={compatible ? '#fadcdc' : 'none'}
                  />
                  <span className="text-2xl font-bold">{bloodType}</span>
                </div>
                
                <div className="text-xs mt-1 text-center">
                  {isSelected ? (
                    <span className="font-medium">Your Blood Type</span>
                  ) : compatible ? (
                    <span className="font-medium">{view === 'donate' ? 'Can Receive' : 'Can Donate'}</span>
                  ) : (
                    <span>Not Compatible</span>
                  )}
                </div>
              </div>
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
