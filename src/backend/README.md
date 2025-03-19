
# RaktSetu Backend API

This is the backend API for RaktSetu, built with Node.js, Express, and MongoDB.

## Setup Instructions

1. Install dependencies:
```
npm install express mongoose cors dotenv bcrypt jsonwebtoken nodemailer
```

2. Create a `.env` file with the following content:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/raktsetu
JWT_SECRET=your_jwt_secret_here
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

3. Start the server:
```
npm start
```

## API Routes

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - User login
- GET /api/auth/verify/:token - Verify user email
- POST /api/auth/forgot-password - Request password reset
- POST /api/auth/reset-password - Reset password

### Donors
- GET /api/donors - Get all donors
- GET /api/donors/:id - Get donor by ID
- POST /api/donors - Register a new donor
- PUT /api/donors/:id - Update donor profile
- GET /api/donors/bloodgroup/:bloodGroup - Get donors by blood group

### Hospitals
- GET /api/hospitals - Get all hospitals
- GET /api/hospitals/:id - Get hospital by ID
- POST /api/hospitals - Register a new hospital
- GET /api/hospitals/:id/blood-inventory - Get blood inventory
- PUT /api/hospitals/:id/blood-inventory - Update blood inventory

### Blood Requests
- GET /api/blood-requests - Get all blood requests
- GET /api/blood-requests/:id - Get blood request by ID
- POST /api/blood-requests - Create a blood request
- PUT /api/blood-requests/:id/status - Update blood request status

## Sample Backend Structure

```
backend/
├── config/
│   └── db.js
├── controllers/
│   ├── authController.js
│   ├── donorController.js
│   ├── hospitalController.js
│   └── bloodRequestController.js
├── models/
│   ├── User.js
│   ├── Donor.js
│   ├── Hospital.js
│   └── BloodRequest.js
├── routes/
│   ├── authRoutes.js
│   ├── donorRoutes.js
│   ├── hospitalRoutes.js
│   └── bloodRequestRoutes.js
├── middleware/
│   ├── auth.js
│   └── errorHandler.js
├── utils/
│   ├── email.js
│   └── validation.js
├── .env
├── package.json
└── server.js
```
