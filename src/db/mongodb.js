
// MongoDB connection utilities for browser environment
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// JWT Secret (should be in an environment variable in production)
export const JWT_SECRET = 'raktsetu-jwt-secret-key-2024';
export const JWT_EXPIRES_IN = '7d';

// Since MongoDB can't be directly used in the browser,
// we'll create a simulated interface that will later connect to a backend API

// In-memory data store (for development/demo purposes only)
const inMemoryDB = {
  users: [],
  donors: [],
  hospitals: [],
  bloodRequests: []
};

// Generate a unique ID
function generateId() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

// Collections access methods
export async function getUsersCollection() {
  console.log('Getting users collection');
  return {
    find: (query = {}) => ({
      toArray: () => Promise.resolve(inMemoryDB.users)
    }),
    findOne: (query) => {
      console.log('Finding user with query:', query);
      if (query._id) {
        return Promise.resolve(inMemoryDB.users.find(user => user._id === query._id));
      }
      if (query.email) {
        return Promise.resolve(inMemoryDB.users.find(user => user.email === query.email));
      }
      if (query.username) {
        return Promise.resolve(inMemoryDB.users.find(user => user.username === query.username));
      }
      return Promise.resolve(null);
    },
    insertOne: (document) => {
      const id = generateId();
      const newDocument = { ...document, _id: id };
      inMemoryDB.users.push(newDocument);
      console.log('Inserted user:', newDocument);
      return Promise.resolve({ insertedId: id });
    },
    updateOne: (filter, update) => {
      const index = inMemoryDB.users.findIndex(user => 
        (filter._id && user._id === filter._id) || 
        (filter.email && user.email === filter.email)
      );
      
      if (index !== -1) {
        if (update.$set) {
          inMemoryDB.users[index] = { ...inMemoryDB.users[index], ...update.$set };
        }
        return Promise.resolve({ modifiedCount: 1 });
      }
      return Promise.resolve({ modifiedCount: 0 });
    }
  };
}

export async function getDonorsCollection() {
  return {
    find: (query = {}) => ({
      toArray: () => {
        if (query.bloodGroup) {
          return Promise.resolve(inMemoryDB.donors.filter(donor => 
            donor.bloodGroup === query.bloodGroup
          ));
        }
        return Promise.resolve(inMemoryDB.donors);
      }
    }),
    findOne: (query) => {
      if (query._id) {
        return Promise.resolve(inMemoryDB.donors.find(donor => donor._id === query._id));
      }
      return Promise.resolve(null);
    },
    insertOne: (document) => {
      const id = generateId();
      const newDocument = { ...document, _id: id };
      inMemoryDB.donors.push(newDocument);
      return Promise.resolve({ insertedId: id });
    },
    updateOne: (filter, update) => {
      const index = inMemoryDB.donors.findIndex(donor => donor._id === filter._id);
      if (index !== -1) {
        if (update.$set) {
          inMemoryDB.donors[index] = { ...inMemoryDB.donors[index], ...update.$set };
        }
        return Promise.resolve({ modifiedCount: 1 });
      }
      return Promise.resolve({ modifiedCount: 0 });
    }
  };
}

export async function getHospitalsCollection() {
  return {
    find: (query = {}) => ({
      toArray: () => Promise.resolve(inMemoryDB.hospitals)
    }),
    findOne: (query) => {
      if (query._id) {
        return Promise.resolve(inMemoryDB.hospitals.find(hospital => hospital._id === query._id));
      }
      return Promise.resolve(null);
    },
    insertOne: (document) => {
      const id = generateId();
      const newDocument = { ...document, _id: id };
      inMemoryDB.hospitals.push(newDocument);
      return Promise.resolve({ insertedId: id });
    },
    updateOne: (filter, update) => {
      const index = inMemoryDB.hospitals.findIndex(hospital => hospital._id === filter._id);
      if (index !== -1) {
        if (update.$set) {
          inMemoryDB.hospitals[index] = { ...inMemoryDB.hospitals[index], ...update.$set };
        }
        return Promise.resolve({ modifiedCount: 1 });
      }
      return Promise.resolve({ modifiedCount: 0 });
    }
  };
}

export async function getBloodRequestsCollection() {
  return {
    find: (query = {}) => ({
      toArray: () => Promise.resolve(inMemoryDB.bloodRequests)
    }),
    findOne: (query) => {
      if (query._id) {
        return Promise.resolve(inMemoryDB.bloodRequests.find(request => request._id === query._id));
      }
      return Promise.resolve(null);
    },
    insertOne: (document) => {
      const id = generateId();
      const newDocument = { ...document, _id: id };
      inMemoryDB.bloodRequests.push(newDocument);
      return Promise.resolve({ insertedId: id });
    },
    updateOne: (filter, update) => {
      const index = inMemoryDB.bloodRequests.findIndex(request => request._id === filter._id);
      if (index !== -1) {
        if (update.$set) {
          inMemoryDB.bloodRequests[index] = { ...inMemoryDB.bloodRequests[index], ...update.$set };
        }
        return Promise.resolve({ modifiedCount: 1 });
      }
      return Promise.resolve({ modifiedCount: 0 });
    }
  };
}

// Password utilities
export async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

export async function comparePasswords(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

// JWT utilities
export function generateToken(user) {
  return jwt.sign(
    { 
      id: user.id || user._id,
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

// Dummy connection functions to maintain API compatibility
export async function connectToMongoDB() {
  console.log('Connected successfully to MongoDB server (simulated)');
  return { collection: (name) => ({}) };
}

export async function closeMongoDBConnection() {
  console.log('MongoDB connection closed (simulated)');
}
