
// MongoDB connection setup
import { MongoClient } from 'mongodb';

// Connection URL with your MongoDB Atlas connection string
const url = 'mongodb+srv://admin:Admin%401605@cluster0.gizih.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// Database Name
const dbName = 'raktsetu';

// Create a new MongoClient
const client = new MongoClient(url);

// Connection function
export async function connectToMongoDB() {
  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected successfully to MongoDB server');
    
    // Return the database instance
    return client.db(dbName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

// Close connection function
export async function closeMongoDBConnection() {
  try {
    await client.close();
    console.log('MongoDB connection closed');
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
  }
}

// Method to get users collection (for authentication)
export async function getUsersCollection() {
  const db = await connectToMongoDB();
  return db.collection('users');
}

// Method to get blood donors collection
export async function getDonorsCollection() {
  const db = await connectToMongoDB();
  return db.collection('donors');
}

// Method to get hospitals collection
export async function getHospitalsCollection() {
  const db = await connectToMongoDB();
  return db.collection('hospitals');
}

// Method to get blood requests collection
export async function getBloodRequestsCollection() {
  const db = await connectToMongoDB();
  return db.collection('bloodRequests');
}
