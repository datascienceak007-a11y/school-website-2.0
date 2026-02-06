# 🔐 Backend API Documentation

## Base URL
```
http://localhost:8001/api
```

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🔓 Public Endpoints

### Health Check
**GET** `/health`

Check if the server is running.

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-02-06T14:56:34.678Z"
}
```

---

### Submit Admission Enquiry
**POST** `/enquiries`

Submit a new admission enquiry (public access).

**Request Body:**
```json
{
  "studentName": "John Doe",
  "parentName": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+1234567890",
  "branch": "North Campus",  // Must be: "North Campus", "South Campus", or "East Campus"
  "grade": "Grade 5",
  "message": "Optional message"  // Optional
}
```

**Response:**
```json
{
  "success": true,
  "message": "Enquiry submitted successfully. We will contact you within 24 hours.",
  "data": {
    "enquiryId": "ENQ-728C1C2F",
    "studentName": "John Doe",
    "branch": "North Campus"
  }
}
```

**Validation Rules:**
- `studentName`: 2-100 characters
- `parentName`: 2-100 characters
- `email`: Valid email format
- `phone`: 10-20 characters
- `branch`: Must be one of the three campuses
- `grade`: Required

---

## 🔒 Admin Authentication Endpoints

### Admin Login
**POST** `/admin/login`

Login to admin dashboard.

**Request Body:**
```json
{
  "email": "admin@excellenceacademy.edu",
  "password": "Admin@123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "admin": {
      "id": "693d8b...",
      "email": "admin@excellenceacademy.edu",
      "name": "System Administrator",
      "role": "super_admin"
    }
  }
}
```

**Default Credentials:**
- Email: `admin@excellenceacademy.edu`
- Password: `Admin@123`

---

### Verify Token
**GET** `/admin/verify`

Verify if the current token is valid.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "admin": {
      "id": "693d8b...",
      "email": "admin@excellenceacademy.edu",
      "name": "System Administrator",
      "role": "super_admin"
    }
  }
}
```

---

### Get Admin Profile
**GET** `/admin/profile`

Get current admin's profile information.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "693d8b...",
    "email": "admin@excellenceacademy.edu",
    "name": "System Administrator",
    "role": "super_admin",
    "isActive": true,
    "createdAt": "2026-02-06T14:50:00.000Z",
    "updatedAt": "2026-02-06T14:56:00.000Z"
  }
}
```

---

## 🔒 Enquiry Management (Admin Only)

### Get All Enquiries
**GET** `/enquiries`

Fetch all enquiries with optional filtering.

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `branch` (optional): Filter by branch ("North Campus", "South Campus", "East Campus")
- `status` (optional): Filter by status ("pending", "contacted", "enrolled", "rejected")
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Example:**
```
GET /api/enquiries?branch=North Campus&status=pending&page=1&limit=10
```

**Response:**
```json
{
  "success": true,
  "data": {
    "enquiries": [
      {
        "_id": "693d8b...",
        "enquiryId": "ENQ-728C1C2F",
        "studentName": "John Doe",
        "parentName": "Jane Doe",
        "email": "jane@example.com",
        "phone": "+1234567890",
        "branch": "North Campus",
        "grade": "Grade 5",
        "message": "Interested in admission",
        "status": "pending",
        "createdAt": "2026-02-06T14:55:00.000Z",
        "updatedAt": "2026-02-06T14:55:00.000Z"
      }
    ],
    "pagination": {
      "total": 1,
      "page": 1,
      "limit": 20,
      "totalPages": 1
    }
  }
}
```

---

### Get Enquiry by ID
**GET** `/enquiries/:id`

Get details of a specific enquiry.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "693d8b...",
    "enquiryId": "ENQ-728C1C2F",
    "studentName": "John Doe",
    "parentName": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+1234567890",
    "branch": "North Campus",
    "grade": "Grade 5",
    "message": "Interested in admission",
    "status": "pending",
    "createdAt": "2026-02-06T14:55:00.000Z",
    "updatedAt": "2026-02-06T14:55:00.000Z"
  }
}
```

---

### Update Enquiry Status
**PATCH** `/enquiries/:id/status`

Update the status of an enquiry.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "status": "contacted"  // Options: "pending", "contacted", "enrolled", "rejected"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Enquiry status updated successfully.",
  "data": {
    "_id": "693d8b...",
    "enquiryId": "ENQ-728C1C2F",
    "status": "contacted",
    ...
  }
}
```

---

### Get Enquiry Statistics
**GET** `/enquiries/stats`

Get overall statistics and branch-wise breakdown.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "overall": {
      "total": 10,
      "pending": 5,
      "contacted": 3,
      "enrolled": 1,
      "rejected": 1
    },
    "byBranch": [
      { "_id": "North Campus", "count": 4 },
      { "_id": "South Campus", "count": 3 },
      { "_id": "East Campus", "count": 3 }
    ]
  }
}
```

---

## 🖼️ Gallery Management

### Get All Gallery Images
**GET** `/gallery`

Fetch all gallery images (public access).

**Query Parameters:**
- `category` (optional): Filter by category
- `branch` (optional): Filter by branch

**Example:**
```
GET /api/gallery?category=Sports&branch=North Campus
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "693d8b...",
      "imageId": "IMG-A1B2C3D4",
      "title": "Sports Day 2025",
      "category": "Sports",
      "imageUrl": "https://example.com/image.jpg",
      "description": "Annual sports event",
      "branch": "North Campus",
      "createdAt": "2026-02-06T14:55:00.000Z",
      "updatedAt": "2026-02-06T14:55:00.000Z"
    }
  ]
}
```

---

### Upload Image (Admin Only)
**POST** `/gallery`

Upload a new image to the gallery.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Sports Day 2025",
  "category": "Sports",  // Options: "Campus", "Classrooms", "Sports", "Events", "Activities"
  "imageUrl": "https://example.com/image.jpg",
  "description": "Annual sports event",  // Optional
  "branch": "North Campus"  // Optional, can be "All"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Image uploaded successfully.",
  "data": {
    "_id": "693d8b...",
    "imageId": "IMG-A1B2C3D4",
    "title": "Sports Day 2025",
    ...
  }
}
```

---

### Update Image (Admin Only)
**PATCH** `/gallery/:id`

Update image details.

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "Updated Title",
  "category": "Events",
  "description": "Updated description",
  "branch": "South Campus"
}
```

---

### Delete Image (Admin Only)
**DELETE** `/gallery/:id`

Delete an image from the gallery.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Image deleted successfully."
}
```

---

## ⚠️ Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid/missing token)
- `404` - Not Found
- `500` - Internal Server Error

---

## 🔒 Security Features

1. **JWT Authentication**: 7-day expiry tokens
2. **Password Hashing**: bcrypt with salt rounds
3. **Input Validation**: Zod schema validation
4. **Rate Limiting**: 100 requests per 15 minutes
5. **CORS**: Configured for frontend URL
6. **Helmet**: Security headers
7. **MongoDB Injection Protection**: Mongoose sanitization

---

## 📊 Database Models

### Enquiry Schema
```typescript
{
  enquiryId: string (unique)
  studentName: string
  parentName: string
  email: string
  phone: string
  branch: enum ["North Campus", "South Campus", "East Campus"]
  grade: string
  message?: string
  status: enum ["pending", "contacted", "enrolled", "rejected"]
  createdAt: Date
  updatedAt: Date
}
```

### Admin Schema
```typescript
{
  email: string (unique)
  password: string (hashed)
  name: string
  role: enum ["super_admin", "admin"]
  isActive: boolean
  lastLogin?: Date
  createdAt: Date
  updatedAt: Date
}
```

### Gallery Schema
```typescript
{
  imageId: string (unique)
  title: string
  category: enum ["Campus", "Classrooms", "Sports", "Events", "Activities"]
  imageUrl: string
  description?: string
  branch?: string
  uploadedBy: ObjectId (Admin reference)
  createdAt: Date
  updatedAt: Date
}
```

---

## 🚀 Testing the API

### Using cURL

**Submit Enquiry:**
```bash
curl -X POST http://localhost:8001/api/enquiries \
  -H "Content-Type: application/json" \
  -d '{
    "studentName": "John Doe",
    "parentName": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+1234567890",
    "branch": "North Campus",
    "grade": "Grade 5"
  }'
```

**Admin Login:**
```bash
curl -X POST http://localhost:8001/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@excellenceacademy.edu",
    "password": "Admin@123"
  }'
```

**Get Enquiries (with token):**
```bash
curl -X GET http://localhost:8001/api/enquiries \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📝 Notes

- All timestamps are in ISO 8601 format (UTC)
- MongoDB ObjectIds are not JSON serializable - use UUIDs for public IDs
- Rate limiting applies to all `/api` routes
- Token expires after 7 days (configurable in .env)
- Default admin is created automatically on first run
