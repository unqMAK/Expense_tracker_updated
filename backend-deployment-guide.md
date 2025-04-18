# Backend Deployment Guide

You can deploy your Node.js backend to various platforms. Here are instructions for two popular options:

## Option 1: Deploy to Render

### Step 1: Prepare Your Backend for Deployment

1. Make sure your `package.json` has the correct start script:
   ```json
   "scripts": {
     "start": "node index.js",
     "dev": "nodemon index.js"
   }
   ```

2. Update your server's index.js to use the PORT environment variable:
   ```javascript
   const PORT = process.env.PORT || 5000;
   app.listen(PORT, () => {
     console.log(`Server is running on port ${PORT}`);
   });
   ```

3. Add a `engines` field to your package.json to specify the Node.js version:
   ```json
   "engines": {
     "node": ">=14.0.0"
   }
   ```

### Step 2: Create a Render Account and Deploy

1. Sign up at [Render](https://render.com/)
2. Click "New" and select "Web Service"
3. Connect your GitHub/GitLab repository or use the "Public Git repository" option
4. Configure your service:
   - Name: expense-tracker-api
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Select the Free plan
5. Add environment variables:
   - MONGODB_URI: Your MongoDB Atlas connection string
   - JWT_SECRET: Your secret key
   - JWT_EXPIRES_IN: 7d
6. Click "Create Web Service"

## Option 2: Deploy to Heroku

### Step 1: Prepare Your Backend for Deployment

1. Make sure your `package.json` has the correct start script:
   ```json
   "scripts": {
     "start": "node index.js",
     "dev": "nodemon index.js"
   }
   ```

2. Create a `Procfile` in your server directory:
   ```
   web: node index.js
   ```

### Step 2: Install Heroku CLI and Deploy

1. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
2. Login to Heroku:
   ```
   heroku login
   ```
3. Create a new Heroku app:
   ```
   cd server
   heroku create expense-tracker-api
   ```
4. Set environment variables:
   ```
   heroku config:set MONGODB_URI=your_mongodb_atlas_uri
   heroku config:set JWT_SECRET=your_secret_key
   heroku config:set JWT_EXPIRES_IN=7d
   ```
5. Deploy your app:
   ```
   git subtree push --prefix server heroku main
   ```
   (If your server is in a subdirectory of your git repository)

## Step 3: Configure CORS for Your Deployed Backend

Update your CORS configuration in index.js to allow requests from your Netlify frontend:

```javascript
app.use(cors({
  origin: ['https://your-netlify-app.netlify.app', 'http://localhost:3000'],
  credentials: true
}));
```

Replace `https://your-netlify-app.netlify.app` with your actual Netlify domain.

## Step 4: Test Your Deployed API

Once deployed, test your API endpoints using a tool like Postman or by accessing them from your browser:

```
https://your-backend-url.com/api/auth/register
https://your-backend-url.com/api/auth/login
https://your-backend-url.com/api/expenses
```
