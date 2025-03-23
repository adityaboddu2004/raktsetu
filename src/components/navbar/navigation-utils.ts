
import { User, Bell, Settings } from "lucide-react";

type Role = 'hospital' | 'donor' | null;

type NavigationItem = {
  name: string;
  path: string;
};

type UserNavigationItem = {
  name: string;
  path: string;
  icon: any;
};

export const getMainNavigation = (role: Role): NavigationItem[] => {
  const navigation: NavigationItem[] = [
    { name: 'Home', path: '/' },
    { name: 'Find a Donor', path: '/find-donor' },
    { name: 'Events & Campaigns', path: '/events' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  // Add role-specific routes
  if (role) {
    if (role === 'hospital') {
      navigation.push({ name: 'Dashboard', path: '/hospital/dashboard' });
    } else if (role === 'donor') {
      navigation.push({ name: 'Dashboard', path: '/donor/dashboard' });
    }
  }

  return navigation;
};

export const getAuthNavigation = (isAuthenticated: boolean, role: Role): NavigationItem[] => {
  if (!isAuthenticated) {
    return [
      { name: 'Login', path: '/login' },
      { name: 'Register', path: '/register' },
    ];
  }

  return [];
};

export const getDashboardNavigation = (role: Role): NavigationItem[] => {
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

export const getUserNavigation = (role: Role): UserNavigationItem[] => 
  role === "hospital" 
    ? [
        { name: "Dashboard", path: "/hospital/dashboard", icon: User },
        { name: "Emergency Request", path: "/hospital/emergency-request", icon: Bell },
      ]
    : [
        { name: "Dashboard", path: "/donor/dashboard", icon: User },
        { name: "Alert Settings", path: "/donor/alert-settings", icon: Settings },
      ];
