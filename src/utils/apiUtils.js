
// API utility functions to connect with MongoDB backend
import { 
  getUsersCollection, 
  getDonorsCollection, 
  getHospitalsCollection, 
  getBloodRequestsCollection 
} from '@/db/mongodb';

// Donor API functions
export const donorAPI = {
  // Get all donors
  getAllDonors: async () => {
    try {
      const donorsCollection = await getDonorsCollection();
      return await donorsCollection.find({}).toArray();
    } catch (error) {
      console.error('Error fetching donors:', error);
      throw error;
    }
  },
  
  // Get donor by ID
  getDonorById: async (id) => {
    try {
      const donorsCollection = await getDonorsCollection();
      return await donorsCollection.findOne({ _id: id });
    } catch (error) {
      console.error(`Error fetching donor with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Register a new donor
  registerDonor: async (donorData) => {
    try {
      const donorsCollection = await getDonorsCollection();
      const result = await donorsCollection.insertOne(donorData);
      return { id: result.insertedId, ...donorData };
    } catch (error) {
      console.error('Error registering donor:', error);
      throw error;
    }
  },
  
  // Update donor profile
  updateDonorProfile: async (id, profileData) => {
    try {
      const donorsCollection = await getDonorsCollection();
      await donorsCollection.updateOne(
        { _id: id },
        { $set: profileData }
      );
      return { id, ...profileData };
    } catch (error) {
      console.error(`Error updating donor profile with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Get donors by blood group
  getDonorsByBloodGroup: async (bloodGroup) => {
    try {
      const donorsCollection = await getDonorsCollection();
      return await donorsCollection.find({ bloodGroup }).toArray();
    } catch (error) {
      console.error(`Error fetching donors with blood group ${bloodGroup}:`, error);
      throw error;
    }
  },
};

// Hospital API functions
export const hospitalAPI = {
  // Get all hospitals
  getAllHospitals: async () => {
    try {
      const hospitalsCollection = await getHospitalsCollection();
      return await hospitalsCollection.find({}).toArray();
    } catch (error) {
      console.error('Error fetching hospitals:', error);
      throw error;
    }
  },
  
  // Get hospital by ID
  getHospitalById: async (id) => {
    try {
      const hospitalsCollection = await getHospitalsCollection();
      return await hospitalsCollection.findOne({ _id: id });
    } catch (error) {
      console.error(`Error fetching hospital with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Register a new hospital
  registerHospital: async (hospitalData) => {
    try {
      const hospitalsCollection = await getHospitalsCollection();
      const result = await hospitalsCollection.insertOne(hospitalData);
      return { id: result.insertedId, ...hospitalData };
    } catch (error) {
      console.error('Error registering hospital:', error);
      throw error;
    }
  },
  
  // Create a blood request
  createBloodRequest: async (requestData) => {
    try {
      const bloodRequestsCollection = await getBloodRequestsCollection();
      const result = await bloodRequestsCollection.insertOne({
        ...requestData,
        createdAt: new Date(),
        status: 'pending'
      });
      return { id: result.insertedId, ...requestData, status: 'pending' };
    } catch (error) {
      console.error('Error creating blood request:', error);
      throw error;
    }
  },
  
  // Update blood request status
  updateBloodRequestStatus: async (id, status, notes) => {
    try {
      const bloodRequestsCollection = await getBloodRequestsCollection();
      await bloodRequestsCollection.updateOne(
        { _id: id },
        { 
          $set: { 
            status, 
            notes,
            updatedAt: new Date() 
          } 
        }
      );
      return { id, status, notes };
    } catch (error) {
      console.error(`Error updating blood request status for ID ${id}:`, error);
      throw error;
    }
  },
  
  // Get blood inventory
  getBloodInventory: async (hospitalId) => {
    try {
      const hospitalsCollection = await getHospitalsCollection();
      const hospital = await hospitalsCollection.findOne({ _id: hospitalId });
      return hospital?.bloodInventory || {};
    } catch (error) {
      console.error(`Error fetching blood inventory for hospital ID ${hospitalId}:`, error);
      throw error;
    }
  },
  
  // Update blood inventory
  updateBloodInventory: async (hospitalId, inventoryData) => {
    try {
      const hospitalsCollection = await getHospitalsCollection();
      await hospitalsCollection.updateOne(
        { _id: hospitalId },
        { $set: { bloodInventory: inventoryData } }
      );
      return inventoryData;
    } catch (error) {
      console.error(`Error updating blood inventory for hospital ID ${hospitalId}:`, error);
      throw error;
    }
  },
};

// Authentication API functions
export const authAPI = {
  // Login
  login: async (credentials) => {
    try {
      const usersCollection = await getUsersCollection();
      const user = await usersCollection.findOne({ email: credentials.email });
      
      if (!user) {
        throw new Error('User not found');
      }
      
      // In a production app, you would compare hashed passwords here
      
      return {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
        isVerified: user.isVerified || false
      };
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  
  // Register
  register: async (userData) => {
    try {
      const usersCollection = await getUsersCollection();
      
      // Check if email is already registered
      const existingUser = await usersCollection.findOne({ email: userData.email });
      if (existingUser) {
        throw new Error('Email already registered');
      }
      
      // In a production app, you would hash the password here
      
      const newUser = {
        email: userData.email,
        name: userData.name,
        role: userData.role,
        isVerified: false,
        createdAt: new Date()
      };
      
      const result = await usersCollection.insertOne(newUser);
      
      return {
        id: result.insertedId,
        ...newUser
      };
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  },
  
  // Verify user
  verifyUser: async (token) => {
    try {
      // This would be implemented with a proper token verification system
      // For now, we'll just return a mock response
      return { success: true };
    } catch (error) {
      console.error('User verification failed:', error);
      throw error;
    }
  },
  
  // Forgot password
  forgotPassword: async (email) => {
    try {
      const usersCollection = await getUsersCollection();
      const user = await usersCollection.findOne({ email });
      
      if (!user) {
        throw new Error('User not found');
      }
      
      // In a production app, you would generate a password reset token and send an email
      
      return { success: true };
    } catch (error) {
      console.error('Forgot password request failed:', error);
      throw error;
    }
  },
  
  // Reset password
  resetPassword: async (token, newPassword) => {
    try {
      // This would be implemented with a proper token verification system
      // For now, we'll just return a mock response
      return { success: true };
    } catch (error) {
      console.error('Password reset failed:', error);
      throw error;
    }
  },
};
