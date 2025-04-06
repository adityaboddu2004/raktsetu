
// MongoDB connection utilities for browser environment
// Using browser-compatible implementations instead of Node-specific modules

// In-memory data store (for development/demo purposes only)
const inMemoryDB = {
  users: [
    {
      _id: 'dummy123',
      username: 'testuser',
      password: '', // Will be set to hashed value of 'password123'
      email: 'test@example.com',
      name: 'Test User',
      role: 'donor',
      isVerified: true,
      createdAt: new Date()
    }
  ],
  donors: [],
  hospitals: [],
  bloodRequests: []
};

// Hash the dummy password immediately (self-executing async function)
(async function() {
  inMemoryDB.users[0].password = await hashPassword('password123');
  console.log('Dummy user created with username: testuser and password: password123');
})();

// Generate a unique ID
function generateId() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
}

// Simple JWT simulation for browser environment
const JWT_SECRET = 'raktsetu-jwt-secret-key-2024';
const JWT_EXPIRES_IN = '7d';

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

// Browser-compatible password hashing (simplified for demo)
export async function hashPassword(password) {
  // In a real app, use a proper hashing library that works in browsers
  // This is a very simplified hash for demonstration only
  const encoder = new TextEncoder();
  const data = encoder.encode(password + JWT_SECRET);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function comparePasswords(plainPassword, hashedPassword) {
  const hashedPlainPassword = await hashPassword(plainPassword);
  return hashedPlainPassword === hashedPassword;
}

// Browser-compatible JWT implementation (simplified)
export function generateToken(user) {
  // Create a simplified JWT token
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };
  
  const payload = {
    id: user.id || user._id,
    email: user.email,
    role: user.role,
    name: user.name,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7) // 7 days
  };
  
  const stringifiedHeader = btoa(JSON.stringify(header));
  const stringifiedPayload = btoa(JSON.stringify(payload));
  
  // In a real app, we would sign this properly
  // This is just for demo purposes
  const signature = btoa(
    JSON.stringify(payload) + JWT_SECRET
  );
  
  return `${stringifiedHeader}.${stringifiedPayload}.${signature}`;
}

export function verifyToken(token) {
  try {
    if (!token) return null;
    
    const [headerBase64, payloadBase64] = token.split('.');
    
    if (!headerBase64 || !payloadBase64) return null;
    
    // Decode the payload
    const payload = JSON.parse(atob(payloadBase64));
    
    // Check if token is expired
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    
    return payload;
  } catch (error) {
    console.error('Error verifying token:', error);
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
