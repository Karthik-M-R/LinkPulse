# LinkPulse Backend API

A URL shortener backend built with Node.js, Express, and MongoDB.

## Project Structure

```
src/
├── app.js                 # Express app configuration
├── server.js             # Server entry point
├── config/
│   └── db.js             # MongoDB connection
├── controllers/
│   ├── auth.controller.js # Auth logic (register, login)
│   └── link.controller.js # Link logic (shorten, redirect, track)
├── middlewares/
│   ├── auth.middleware.js  # JWT verification
│   └── error.middleware.js # Error handling
├── models/
│   ├── user.model.js     # User schema
│   └── link.model.js     # Link schema
├── routes/
│   ├── auth.routes.js    # Auth endpoints
│   └── link.routes.js    # Link endpoints
├── services/
│   ├── auth.service.js   # Auth business logic
│   └── link.service.js   # Link business logic
└── utils/
    └── generateCode.js   # Generate short codes
```

## API Endpoints

### Authentication

#### Register
```
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response (201):
{
  "status": "success",
  "data": {
    "user": { "_id": "...", "username": "...", "email": "..." },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

#### Login
```
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123!"
}

Response (200):
{
  "status": "success",
  "data": {
    "user": { "_id": "...", "username": "...", "email": "..." },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Links (Requires Authentication)

#### Shorten URL
```
POST /api/links
Authorization: Bearer <token>
Content-Type: application/json

{
  "originalUrl": "https://www.example.com/very/long/url"
}

Response (201):
{
  "status": "success",
  "data": {
    "_id": "...",
    "originalUrl": "https://www.example.com/very/long/url",
    "shortCode": "abc123",
    "clicks": 0,
    "owner": "...",
    "createdAt": "2026-01-15T...",
    "updatedAt": "2026-01-15T..."
  }
}
```

#### Get My Links
```
GET /api/links/my-links
Authorization: Bearer <token>

Response (200):
{
  "status": "success",
  "results": 2,
  "data": [
    {
      "_id": "...",
      "originalUrl": "https://example.com/url1",
      "shortCode": "abc123",
      "clicks": 5,
      "owner": "...",
      "createdAt": "2026-01-15T..."
    },
    ...
  ]
}
```

#### Delete Link
```
DELETE /api/links/:id
Authorization: Bearer <token>

Response (200):
{
  "status": "success",
  "message": "Link deleted successfully"
}
```

#### Redirect (Public - No Auth Required)
```
GET /api/links/:shortCode

Response: Redirects (301) to original URL and increments click count
```

### Health Check
```
GET /health

Response (200):
{
  "status": "Success",
  "message": "Server is healthy and breathing! ✅"
}
```

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Create .env file**
   ```
   MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/linkpulse
   JWT_SECRET=your_super_secret_jwt_key_here
   PORT=5000
   NODE_ENV=development
   ```

3. **Start Server (Development)**
   ```bash
   npm run dev
   ```

4. **Start Server (Production)**
   ```bash
   npm start
   ```

## Error Handling

All errors return standardized JSON responses:

```json
{
  "status": "error",
  "message": "Error description here"
}
```

### Common Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid token)
- `404` - Not Found
- `500` - Server Error

## Testing with Postman

1. **Register a user** (POST `/api/auth/register`)
2. **Login** (POST `/api/auth/login`) - Copy the token
3. **Create link** (POST `/api/links`) - Use the token in Authorization header
4. **Get your links** (GET `/api/links/my-links`) - Use the token
5. **Test redirect** (GET `/api/links/:shortCode`) - No token needed
6. **Delete link** (DELETE `/api/links/:id`) - Use the token

## Key Features

✅ User registration and login with JWT authentication
✅ Create short links from long URLs
✅ Automatic click tracking on redirects
✅ User-specific link management
✅ MongoDB integration with Mongoose
✅ Password hashing with bcryptjs
✅ Error handling middleware
✅ CORS support

## Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **nanoid** - Generate short codes
- **dotenv** - Environment variables
- **cors** - Cross-origin requests

## Security Features

- Passwords are hashed with bcryptjs (10 salt rounds)
- JWT tokens expire after 30 days
- Protected routes require valid JWT token
- User can only manage their own links
- MongoDB connection uses secure URIs
