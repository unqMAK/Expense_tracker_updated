# Netlify Deployment Guide for Your React Frontend

## Step 1: Prepare Your Frontend for Production

First, we need to update the API endpoint in your frontend to point to your deployed backend instead of localhost.

Create a `.env` file in your client directory:

```
cd client
```

Create a file named `.env` with the following content:

```
VITE_API_URL=https://your-backend-url.com
```

Replace `https://your-backend-url.com` with your actual backend URL after deployment.

## Step 2: Update Your Frontend Code to Use Environment Variables

Modify your axios calls to use the environment variable:

```javascript
// Instead of hardcoded URLs like:
// axios.get('/api/expenses')

// Use:
axios.get(`${import.meta.env.VITE_API_URL}/api/expenses`)
```

## Step 3: Create a Netlify Configuration File

Create a `netlify.toml` file in the root of your client directory:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Step 4: Deploy to Netlify

### Option 1: Deploy via Netlify UI

1. Build your project locally:
   ```
   cd client
   npm run build
   ```

2. Go to [Netlify](https://app.netlify.com/) and sign up/login
3. Drag and drop your `dist` folder to the Netlify dashboard

### Option 2: Deploy via Netlify CLI

1. Install Netlify CLI:
   ```
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```
   netlify login
   ```

3. Initialize your site:
   ```
   cd client
   netlify init
   ```

4. Deploy your site:
   ```
   netlify deploy --prod
   ```

## Step 5: Configure Environment Variables on Netlify

1. Go to your site dashboard on Netlify
2. Navigate to Site settings > Build & deploy > Environment
3. Add the environment variable:
   - Key: `VITE_API_URL`
   - Value: Your backend URL (e.g., `https://your-backend-url.com`)

## Step 6: Set Up Continuous Deployment (Optional)

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. In Netlify, go to Site settings > Build & deploy > Continuous Deployment
3. Connect to your Git provider and select your repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

## Step 7: Custom Domain (Optional)

1. In Netlify, go to Site settings > Domain management
2. Click "Add custom domain"
3. Follow the instructions to set up your domain with Netlify
