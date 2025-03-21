
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar, Droplet, Users, AlertCircle } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import Button from "@/components/Button";
import BloodCompatibilityChart from "@/components/BloodCompatibilityChart";
import BloodDonationCamps from "@/components/BloodDonationCamps";

// Mock data for the dashboard
const bloodInventory = [
  { name: "A+", units: 45 },
  { name: "A-", units: 12 },
  { name: "B+", units: 38 },
  { name: "B-", units: 10 },
  { name: "AB+", units: 15 },
  { name: "AB-", units: 5 },
  { name: "O+", units: 57 },
  { name: "O-", units: 22 },
];

const recentDonations = [
  {
    id: 1,
    donorName: "Rahul Sharma",
    bloodGroup: "O+",
    donationDate: "2023-07-01",
    units: 1,
    status: "Completed",
  },
  {
    id: 2,
    donorName: "Priya Patel",
    bloodGroup: "A-",
    donationDate: "2023-06-28",
    units: 1,
    status: "Completed",
  },
  {
    id: 3,
    donorName: "Amit Singh",
    bloodGroup: "B+",
    donationDate: "2023-06-25",
    units: 1,
    status: "Completed",
  },
  {
    id: 4,
    donorName: "Sanya Kapoor",
    bloodGroup: "AB+",
    donationDate: "2023-06-22",
    units: 1,
    status: "Completed",
  },
];

const pendingRequests = [
  {
    id: 1,
    patientName: "Vijay Kumar",
    bloodGroup: "O-",
    requiredUnits: 2,
    urgency: "High",
    requestDate: "2023-07-02",
  },
  {
    id: 2,
    patientName: "Meera Desai",
    bloodGroup: "A+",
    requiredUnits: 1,
    urgency: "Medium",
    requestDate: "2023-07-01",
  },
  {
    id: 3,
    patientName: "Rajesh Gupta",
    bloodGroup: "B-",
    requiredUnits: 3,
    urgency: "Medium",
    requestDate: "2023-06-30",
  },
];

// Calculate total units
const totalUnits = bloodInventory.reduce((sum, item) => sum + item.units, 0);
const totalDonors = 750;
const criticalBloodTypes = bloodInventory.filter(type => type.units < 15).map(type => type.name).join(", ");

const HospitalDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("inventory");

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "High":
        return "text-blood";
      case "Medium":
        return "text-orange-500";
      case "Low":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1">Hospital Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, City Hospital
            </p>
          </div>
          <div className="mt-4 md:mt-0 space-x-2">
            <Button 
              variant="secondary" 
              onClick={() => navigate("/events")}
            >
              <Calendar className="mr-2 h-4 w-4" />
              View Events
            </Button>
            <Button 
              variant="primary" 
              onClick={() => navigate("/hospital/emergency-request")}
            >
              <AlertCircle className="mr-2 h-4 w-4" />
              Emergency Request
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Blood Units
              </CardTitle>
              <Droplet className="h-4 w-4 text-blood" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUnits}</div>
              <p className="text-xs text-muted-foreground">
                Across all blood groups
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Registered Donors
              </CardTitle>
              <Users className="h-4 w-4 text-blood" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalDonors}</div>
              <p className="text-xs text-muted-foreground">
                Increasing by 12% this month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Recent Donations
              </CardTitle>
              <Droplet className="h-4 w-4 text-blood" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{recentDonations.length}</div>
              <p className="text-xs text-muted-foreground">
                In the last 7 days
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Critical Shortages
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-blood" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{criticalBloodTypes || "None"}</div>
              <p className="text-xs text-muted-foreground">
                Blood groups with less than 15 units
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Blood Inventory Levels</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer className="h-[300px]" config={{}}>
                <BarChart data={bloodInventory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border bg-background p-2 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Blood Type
                                </span>
                                <span className="font-bold text-blood">
                                  {payload[0].payload.name}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  Units
                                </span>
                                <span className="font-bold">
                                  {payload[0].payload.units}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar
                    dataKey="units"
                    fill="#E63946"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="inventory">Inventory</TabsTrigger>
                  <TabsTrigger value="donations">Donations</TabsTrigger>
                  <TabsTrigger value="requests">Requests</TabsTrigger>
                </TabsList>
                <TabsContent value="inventory" className="space-y-4">
                  <div className="text-sm">
                    Recent inventory changes and updates will be shown here.
                  </div>
                </TabsContent>
                <TabsContent value="donations">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Donor</TableHead>
                        <TableHead>Blood Group</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentDonations.map((donation) => (
                        <TableRow key={donation.id}>
                          <TableCell className="font-medium">{donation.donorName}</TableCell>
                          <TableCell>{donation.bloodGroup}</TableCell>
                          <TableCell>{formatDate(donation.donationDate)}</TableCell>
                          <TableCell>
                            <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                              {donation.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
                <TabsContent value="requests">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient</TableHead>
                        <TableHead>Blood Group</TableHead>
                        <TableHead>Units</TableHead>
                        <TableHead>Urgency</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.patientName}</TableCell>
                          <TableCell>{request.bloodGroup}</TableCell>
                          <TableCell>{request.requiredUnits}</TableCell>
                          <TableCell>
                            <span className={getUrgencyColor(request.urgency)}>
                              {request.urgency}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8">
          <BloodCompatibilityChart />
        </div>

        <div>
          <BloodDonationCamps />
        </div>
      </div>
    </Layout>
  );
};

export default HospitalDashboard;
