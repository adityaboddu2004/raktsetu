
import { getHospitalsCollection, getBloodRequestsCollection } from '../db/mongodb';

// Get all hospitals
export async function getAllHospitals() {
  try {
    const collection = await getHospitalsCollection();
    return await collection.find({}).toArray();
  } catch (error) {
    console.error('Error fetching all hospitals:', error);
    throw error;
  }
}

// Register a new hospital
export async function registerHospital(hospitalData) {
  try {
    const collection = await getHospitalsCollection();
    const result = await collection.insertOne({
      ...hospitalData,
      createdAt: new Date(),
      isVerified: false,
    });
    return result;
  } catch (error) {
    console.error('Error registering hospital:', error);
    throw error;
  }
}

// Create a blood request
export async function createBloodRequest(requestData) {
  try {
    const collection = await getBloodRequestsCollection();
    const result = await collection.insertOne({
      ...requestData,
      createdAt: new Date(),
      status: 'pending', // pending, approved, rejected, fulfilled
    });
    return result;
  } catch (error) {
    console.error('Error creating blood request:', error);
    throw error;
  }
}

// Update blood request status
export async function updateBloodRequestStatus(requestId, status, notes = '') {
  try {
    const collection = await getBloodRequestsCollection();
    const result = await collection.updateOne(
      { _id: requestId },
      { 
        $set: { 
          status, 
          updatedAt: new Date(),
          notes: notes
        } 
      }
    );
    return result;
  } catch (error) {
    console.error('Error updating blood request status:', error);
    throw error;
  }
}

// Get blood inventory for a hospital
export async function getBloodInventory(hospitalId) {
  try {
    const collection = await getHospitalsCollection();
    const hospital = await collection.findOne({ _id: hospitalId });
    return hospital?.bloodInventory || {};
  } catch (error) {
    console.error('Error fetching blood inventory:', error);
    throw error;
  }
}

// Update blood inventory
export async function updateBloodInventory(hospitalId, bloodGroup, quantity) {
  try {
    const collection = await getHospitalsCollection();
    const result = await collection.updateOne(
      { _id: hospitalId },
      { 
        $set: { 
          [`bloodInventory.${bloodGroup}`]: quantity,
          updatedAt: new Date() 
        } 
      }
    );
    return result;
  } catch (error) {
    console.error('Error updating blood inventory:', error);
    throw error;
  }
}
