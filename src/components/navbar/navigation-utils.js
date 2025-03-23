
import { User, Bell, Settings } from "lucide-react";

export const getMainNavigation = (role) => [
  { name: "Home", path: "/" },
  { name: "Find a Donor", path: "/find-donor" },
  { name: "Events & Campaigns", path: "/events" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  ...(role === "hospital" ? [{ name: "Dashboard", path: "/hospital/dashboard" }] : []),
  ...(role === "donor" ? [{ name: "Dashboard", path: "/donor/dashboard" }] : []),
];

export const getDashboardNavigation = (role) => {
  if (role === 'hospital') {
    return [
      { name: 'Overview', path: '/hospital/dashboard' },
      { name: 'Blood Requests', path: '/hospital/all-requests' },
      { name: 'Emergency Request', path: '/hospital/emergency-request' },
    ];
  } else if (role === 'donor') {
    return [
      { name: 'Overview', path: '/donor/dashboard' },
      { name: 'Donation History', path: '/donor/history' },
      { name: 'Alert Settings', path: '/donor/alert-settings' },
      { name: 'Health Records', path: '/donor/health' },
    ];
  }
  
  return [];
};

export const getUserNavigation = (role) => 
  role === "hospital" 
    ? [
        { name: "Dashboard", path: "/hospital/dashboard", icon: User },
        { name: "Emergency Request", path: "/hospital/emergency-request", icon: Bell },
      ]
    : [
        { name: "Dashboard", path: "/donor/dashboard", icon: User },
        { name: "Alert Settings", path: "/donor/alert-settings", icon: Settings },
      ];
