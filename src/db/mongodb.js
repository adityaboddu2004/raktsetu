
// MongoDB connection setup
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Connection URL with MongoDB Atlas connection string
const url = 'mongodb+srv://admin:Admin%401605@cluster0.gizih.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
// Database Name
const dbName = 'raktsetu';

// JWT Secret (should be in an environment variable in production)
export const JWT_SECRET = 'raktsetu-jwt-secret-key-2024';
export const JWT_EXPIRES_IN = '7d';

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

// Password Utilities
export async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

export async function comparePasswords(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

// JWT Utilities
export function generateToken(user) {
  return jwt.sign(
    { 
      id: user.id || user._id.toString(),
      email: user.email,
      role: user.role,
      name: user.name
    }, 
    JWT_SECRET, 
    { expiresIn: JWT_EXPIRES_IN }
  );
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
