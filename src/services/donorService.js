
import { getDonorsCollection, connectToMongoDB } from '../db/mongodb';

// Get all donors
export async function getAllDonors() {
  try {
    const collection = await getDonorsCollection();
    return await collection.find({}).toArray();
  } catch (error) {
    console.error('Error fetching all donors:', error);
    throw error;
  }
}

// Get donors by blood group
export async function getDonorsByBloodGroup(bloodGroup) {
  try {
    const collection = await getDonorsCollection();
    return await collection.find({ bloodGroup }).toArray();
  } catch (error) {
    console.error(`Error fetching donors with blood group ${bloodGroup}:`, error);
    throw error;
  }
}

// Register a new donor
export async function registerDonor(donorData) {
  try {
    const collection = await getDonorsCollection();
    const result = await collection.insertOne({
      ...donorData,
      createdAt: new Date(),
      isVerified: false,
      isAvailable: true,
    });
    return result;
  } catch (error) {
    console.error('Error registering donor:', error);
    throw error;
  }
}

// Update donor verification status
export async function updateDonorVerification(donorId, isVerified) {
  try {
    const collection = await getDonorsCollection();
    const result = await collection.updateOne(
      { _id: donorId },
      { $set: { isVerified, verifiedAt: new Date() } }
    );
    return result;
  } catch (error) {
    console.error('Error updating donor verification:', error);
    throw error;
  }
}

// Get donor by ID
export async function getDonorById(donorId) {
  try {
    const collection = await getDonorsCollection();
    return await collection.findOne({ _id: donorId });
  } catch (error) {
    console.error('Error fetching donor:', error);
    throw error;
  }
}

// Update donor profile
export async function updateDonorProfile(donorId, profileData) {
  try {
    const collection = await getDonorsCollection();
    const result = await collection.updateOne(
      { _id: donorId },
      { $set: { ...profileData, updatedAt: new Date() } }
    );
    return result;
  } catch (error) {
    console.error('Error updating donor profile:', error);
    throw error;
  }
}
