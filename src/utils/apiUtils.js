
// API utility functions to connect with MongoDB backend

// Base URL for the API
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-production-api.com/api' 
  : 'http://localhost:5000/api';

// Generic fetch function with error handling
async function fetchFromAPI(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
}

// Donor API functions
export const donorAPI = {
  // Get all donors
  getAllDonors: () => fetchFromAPI('/donors'),
  
  // Get donor by ID
  getDonorById: (id) => fetchFromAPI(`/donors/${id}`),
  
  // Register a new donor
  registerDonor: (donorData) => fetchFromAPI('/donors', {
    method: 'POST',
    body: JSON.stringify(donorData),
  }),
  
  // Update donor profile
  updateDonorProfile: (id, profileData) => fetchFromAPI(`/donors/${id}`, {
    method: 'PUT',
    body: JSON.stringify(profileData),
  }),
  
  // Get donors by blood group
  getDonorsByBloodGroup: (bloodGroup) => fetchFromAPI(`/donors/bloodgroup/${bloodGroup}`),
};

// Hospital API functions
export const hospitalAPI = {
  // Get all hospitals
  getAllHospitals: () => fetchFromAPI('/hospitals'),
  
  // Get hospital by ID
  getHospitalById: (id) => fetchFromAPI(`/hospitals/${id}`),
  
  // Register a new hospital
  registerHospital: (hospitalData) => fetchFromAPI('/hospitals', {
    method: 'POST',
    body: JSON.stringify(hospitalData),
  }),
  
  // Create a blood request
  createBloodRequest: (requestData) => fetchFromAPI('/blood-requests', {
    method: 'POST',
    body: JSON.stringify(requestData),
  }),
  
  // Update blood request status
  updateBloodRequestStatus: (id, status, notes) => fetchFromAPI(`/blood-requests/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ status, notes }),
  }),
  
  // Get blood inventory
  getBloodInventory: (hospitalId) => fetchFromAPI(`/hospitals/${hospitalId}/blood-inventory`),
  
  // Update blood inventory
  updateBloodInventory: (hospitalId, inventoryData) => fetchFromAPI(`/hospitals/${hospitalId}/blood-inventory`, {
    method: 'PUT',
    body: JSON.stringify(inventoryData),
  }),
};

// Authentication API functions
export const authAPI = {
  // Login
  login: (credentials) => fetchFromAPI('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  // Register
  register: (userData) => fetchFromAPI('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  
  // Verify user
  verifyUser: (token) => fetchFromAPI(`/auth/verify/${token}`),
  
  // Forgot password
  forgotPassword: (email) => fetchFromAPI('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  }),
  
  // Reset password
  resetPassword: (token, newPassword) => fetchFromAPI('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify({ token, newPassword }),
  }),
};
