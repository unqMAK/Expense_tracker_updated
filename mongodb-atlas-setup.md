# MongoDB Atlas Setup Guide

## Step 1: Create a MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Sign up for a free account

## Step 2: Create a New Cluster
1. Click "Build a Database"
2. Choose the FREE tier option (M0 Sandbox)
3. Select your preferred cloud provider (AWS, Google Cloud, or Azure)
4. Choose a region closest to your users
5. Click "Create Cluster" (this may take a few minutes)

## Step 3: Set Up Database Access
1. In the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Create a username and password (save these credentials securely)
4. Set privileges to "Read and Write to Any Database"
5. Click "Add User"

## Step 4: Configure Network Access
1. In the left sidebar, click "Network Access"
2. Click "Add IP Address"
3. For development, you can click "Allow Access from Anywhere" (0.0.0.0/0)
   (Note: For production, you should restrict this to specific IP addresses)
4. Click "Confirm"

## Step 5: Get Your Connection String
1. Go back to "Database" in the left sidebar
2. Click "Connect" on your cluster
3. Select "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user's password
6. Replace `myFirstDatabase` with your preferred database name (e.g., "expense-tracker")

## Step 6: Update Your Backend .env File
Update your server/.env file with the new MongoDB URI:

```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/expense-tracker?retryWrites=true&w=majority
JWT_SECRET=your-secure-secret-key
JWT_EXPIRES_IN=7d
PORT=5000
```

Make sure to replace:
- `<username>` with your MongoDB Atlas username
- `<password>` with your MongoDB Atlas password
- The cluster address with your actual cluster address
