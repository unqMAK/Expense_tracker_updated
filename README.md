# ExpenseTracker - Modern Financial Management

![ExpenseTracker Banner](https://img.shields.io/badge/ExpenseTracker-Financial%20Management-blue)

## Overview

ExpenseTracker is a full-stack web application designed to help users manage their personal finances efficiently. Built with the MERN stack (MongoDB, Express.js, React, Node.js), this application provides a seamless and intuitive interface for tracking expenses, visualizing spending patterns, and making informed financial decisions.

## Features

- **User Authentication**: Secure registration and login system with JWT authentication
- **Expense Management**: Add, edit, and delete expenses with categorization
- **Financial Dashboard**: Visual representation of spending patterns with charts and statistics
- **Category Filtering**: Filter expenses by categories for better analysis
- **Responsive Design**: Fully responsive UI that works on desktop and mobile devices
- **Data Visualization**: Interactive charts to visualize spending patterns
- **Currency Support**: Support for Indian Rupee (₹) currency format
- **Smooth Animations**: Enhanced user experience with subtle animations

## Technology Stack

### Frontend
- React.js
- Tailwind CSS for styling
- Anime.js for animations
- Recharts for data visualization
- React Router for navigation
- Context API for state management

### Backend
- Node.js with Express.js
- MongoDB for database
- JWT for authentication
- RESTful API architecture

## Project Structure

- `/client` - React frontend built with Vite
- `/server` - Node.js/Express backend API

## Local Development Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### Backend Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```
   cp .env.example .env
   ```

4. Update the `.env` file with your MongoDB connection string and other settings.

5. Start the development server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file:
   ```
   cp .env.example .env
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Deployment

### Backend Deployment

See the detailed instructions in [backend-deployment-guide.md](backend-deployment-guide.md).

### Frontend Deployment

See the detailed instructions in [netlify-deployment-guide.md](netlify-deployment-guide.md).

### MongoDB Atlas Setup

See the detailed instructions in [mongodb-atlas-setup.md](mongodb-atlas-setup.md).

## Environment Variables

### Backend (server/.env)

- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `JWT_EXPIRES_IN`: JWT token expiration time
- `PORT`: Server port
- `ALLOWED_ORIGINS`: Comma-separated list of allowed origins for CORS

### Frontend (client/.env)

- `VITE_API_URL`: URL of the backend API

## Future Enhancements

- Budget planning and tracking
- Income tracking
- Financial goals setting
- Expense predictions based on historical data
- Export data to CSV/PDF
- Dark mode support

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Mandar Kulkarni - [mandarak123@gmail.com](mailto:mandarak123@gmail.com)

Project Link: [https://github.com/unqMAK/Expense_tracker_updated](https://github.com/unqMAK/Expense_tracker_updated)
