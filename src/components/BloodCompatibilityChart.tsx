
import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const BloodCompatibilityChart = () => {
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
  
  const isCompatible = (bloodType: string) => {
    if (view === 'donate') {
      return compatibility.donate[bloodType as keyof typeof compatibility.donate];
    } else {
      return compatibility.receive[bloodType as keyof typeof compatibility.receive];
    }
  };
  
  return (
    <Card className="shadow-sm">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Blood Compatibility Chart</h2>
          <Tabs defaultValue="donate" className="w-[400px]" onValueChange={(value) => setView(value as 'donate' | 'receive')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="donate">Can donate to</TabsTrigger>
              <TabsTrigger value="receive">Can receive from</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="grid grid-cols-4 gap-4">
          {bloodTypes.map((bloodType) => {
            const compatibleTypes = isCompatible(bloodType);
            const isUniversalDonor = bloodType === 'O-' && view === 'donate';
            const isUniversalReceiver = bloodType === 'AB+' && view === 'receive';
            
            return (
              <div 
                key={bloodType}
                className={`border rounded-lg p-6 flex items-center justify-center text-2xl font-bold
                  ${isUniversalDonor || isUniversalReceiver 
                    ? 'bg-green-50 border-green-200 text-green-600' 
                    : 'bg-red-50 border-red-100 text-blood'
                  }
                  ${view === 'donate' && bloodType === 'A+' ? 'ring-2 ring-blood' : ''}
                  ${view === 'receive' && bloodType === 'A+' ? 'ring-2 ring-blood' : ''}
                  transition-all hover:shadow-md`}
              >
                {bloodType}
              </div>
            );
          })}
        </div>
        
        <div className="mt-6 text-sm text-muted-foreground">
          {view === 'donate' ? (
            <p>Highlighted blood types can donate to more recipients. O- is the universal donor.</p>
          ) : (
            <p>Highlighted blood types can receive from more donors. AB+ is the universal recipient.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BloodCompatibilityChart;
