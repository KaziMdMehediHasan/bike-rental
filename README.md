# Bike Rental Reservation System Backend

Welcome to the Bike Rental Reservation System Backend repository. This backend service is designed to manage a bike rental service, handling user registrations, bike availability, booking management, authentication, authorization, and more.

### Features

1. User registration and login
2. Bike management (CRUD operations)
3. Rental management (create rental, return bike, see all rental information)
4. Authentication and authorization
5. Error handling and validation

### Technology Stack

- Programming Language: TypeScript
- Web Framework: Express.js
- ODM & Validation Library: Mongoose, Zod
- Database: MongoDB

## Setup Instructions

### Prerequisites

Ensure you have the following installed on your local machine:

- Node.js (v14.x or higher)
- npm (v6.x or higher)
- MongoDB

### Installation

1. Clone the repository:

```sh
git clone https://github.com/yourusername/bike-rental-reservation-system.git
cd bike-rental-reservation-system
```

2. Install the dependencies:

```sh
npm install
```

3. Add your own environment variable

```env
NODE_DEV = development/production
PORT = YOUR_PORT
DB_URL = mongodb URL
BCRYPT_SALT_ROUNDS=INPUT_YOUR_NUMBER
JWT_ACCESS_SECRET = YOUR_SECRET_TOKEN
```

### Running the Server

Start the development server:

```sh
npm run start:dev
```

The server should now be running at http://localhost:YOUR_PORT

## API Endpoints

### User Routes

- Sign Up
- Route:

```sh
/api/auth/signup (POST)
```

- Request Body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "1234567890",
  "address": "123 Main St, Anytown",
  "role": "admin"
}
```

- Login
- Route:

```sh
/api/auth/login (POST)
```

- Request Body:

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

- Get Profile
- Route:

```sh
/api/users/me (GET)
```

- Headers: Authorization: Bearer jwt_token

- Update Profile
- Route:

```sh
/api/users/me (PUT)
```

- Headers: Authorization: Bearer jwt_token

Request Body:

```json
{
  "name": "John Updated",
  "phone": "0987654321"
}
```

- Bike Routes
- Create Bike (Admin Only)
- Route:

```sh
/api/bikes (POST)
```

- Headers: Authorization: Bearer jwt_token

Request Body:

```json
{
  "name": "Mountain Bike",
  "description": "A durable mountain bike for rough terrains.",
  "pricePerHour": 15,
  "cc": 250,
  "year": 2022,
  "model": "X1",
  "brand": "Yamaha"
}
```

- Get All Bikes
- Route:

```sh
/api/bikes (GET)
```

- Update Bike (Admin Only)
- Route:

```sh
/api/bikes/:id (PUT)
```

- Headers: Authorization: Bearer jwt_token

Request Body:

```json
{
  "pricePerHour": 20
}
```

- Delete Bike (Admin Only)
- Route:

```sh
/api/bikes/:id (DELETE)
```

- Headers: Authorization: Bearer jwt_token

- Rental Routes
- Create Rental
- Route:

```sh
/api/rentals (POST)
```

- Headers: Authorization: Bearer jwt_token

Request Body:

```json
{
  "bikeId": "60d9c4e4f3b4b544b8b8d1c4",
  "startTime": "2024-06-10T09:00:00Z"
}
```

- Return Bike (Admin Only)
- Route:

```sh
/api/rentals/:id/return (PUT)
```

- Headers: Authorization: Bearer jwt_token

- Get All Rentals for User
- Route:

```sh
/api/rentals (GET)
```

- Headers: Authorization: Bearer jwt_token
