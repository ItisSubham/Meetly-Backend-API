# Deploying Meetly Backend to Render

This guide will help you deploy the Meetly backend API to Render, a modern cloud platform.

## Prerequisites

1. A [Render](https://render.com) account
2. Your backend code pushed to a GitHub repository
3. Environment variables ready (see `.env.production` for reference)

## Option 1: Deploy using Render.yaml (Recommended)

1. **Fork/Clone this repository** to your GitHub account

2. **Connect to Render:**

   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Select this repository
   - **Important**: Set the "Root Directory" to `backend` since the `render.yaml` file is located in the backend folder
   - Render will automatically detect the `render.yaml` file in the backend directory

3. **Configure Environment Variables:**

   - Update the following variables in your Render service:
     - `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID
     - `GOOGLE_CLIENT_SECRET`: Your Google OAuth Client Secret
     - `FRONTEND_ORIGIN`: Your frontend domain (e.g., `https://your-app.onrender.com`)
     - `FRONTEND_INTEGRATION_URL`: Your frontend integration URL
     - `GOOGLE_REDIRECT_URI`: Update with your actual Render backend URL

4. **Deploy:**
   - Click "Apply" to create the services
   - Render will automatically provision a PostgreSQL database and deploy your backend

## Option 2: Manual Deployment

1. **Create a PostgreSQL Database:**

   - In Render Dashboard, click "New" → "PostgreSQL"
   - Choose a name (e.g., `meetly-postgres`)
   - Select the free plan for testing
   - Note the connection details

2. **Create a Web Service:**

   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `meetly-backend`
     - **Region**: Choose closest to your users
     - **Branch**: `main` (or your default branch)
     - **Root Directory**: `backend`
     - **Runtime**: `Node`
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`

3. **Environment Variables:**
   Set these in your Render service settings:

   ```
   NODE_ENV=production
   PORT=10000
   BASE_PATH=/api
   DATABASE_URL=[Your PostgreSQL connection string from step 1]
   JWT_SECRET=[Generate a secure random string]
   JWT_EXPIRES_IN=7d
   GOOGLE_CLIENT_ID=[Your Google OAuth Client ID]
   GOOGLE_CLIENT_SECRET=[Your Google OAuth Client Secret]
   GOOGLE_REDIRECT_URI=https://[your-service-name].onrender.com/api/integration/google/callback
   FRONTEND_ORIGIN=https://[your-frontend-domain]
   FRONTEND_INTEGRATION_URL=https://[your-frontend-domain]/app/integrations
   ```

4. **Deploy:**
   - Click "Create Web Service"
   - Render will build and deploy your application

## Option 3: Docker Deployment

If you prefer using Docker:

1. **Build locally:**

   ```bash
   cd backend
   docker build -t meetly-backend .
   ```

2. **Deploy to Render:**
   - Create a new Web Service
   - Choose "Deploy an existing Docker image"
   - Push your image to a registry (Docker Hub, etc.)
   - Configure environment variables as above

## Post-Deployment Steps

1. **Verify Deployment:**

   - Visit your Render service URL
   - You should see a health check response: `{"message": "Meetly Backend API is running successfully!"}`

2. **Test API Endpoints:**

   - Health check: `GET /`
   - API endpoints: `GET /api/[endpoint]`

3. **Configure Google OAuth:**

   - Update your Google Cloud Console OAuth settings
   - Add your Render backend URL to authorized redirect URIs
   - Format: `https://[your-service-name].onrender.com/api/integration/google/callback`

4. **Database Migrations:**
   - Migrations run automatically after build via the `postbuild` script
   - Monitor logs to ensure successful migration

## Monitoring and Troubleshooting

1. **View Logs:**

   - In Render Dashboard → Your Service → Logs
   - Check for any startup errors or runtime issues

2. **Health Checks:**

   - Render automatically monitors your service health
   - The `/` endpoint provides health status

3. **Common Issues:**
   - **Build failures**: Check Node.js version compatibility
   - **Database connection**: Verify DATABASE_URL format
   - **CORS errors**: Ensure FRONTEND_ORIGIN is correctly set
   - **OAuth errors**: Verify Google OAuth configuration

## Environment Variables Reference

| Variable               | Description                  | Example                       |
| ---------------------- | ---------------------------- | ----------------------------- |
| `NODE_ENV`             | Environment mode             | `production`                  |
| `PORT`                 | Server port                  | `10000`                       |
| `DATABASE_URL`         | PostgreSQL connection string | Provided by Render            |
| `JWT_SECRET`           | JWT signing secret           | Generate secure random string |
| `GOOGLE_CLIENT_ID`     | Google OAuth Client ID       | From Google Cloud Console     |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret   | From Google Cloud Console     |
| `FRONTEND_ORIGIN`      | Frontend domain for CORS     | `https://app.onrender.com`    |

## Security Considerations

1. **Environment Variables**: Never commit secrets to version control
2. **JWT Secret**: Use a strong, randomly generated secret
3. **Database**: Use the provided Render PostgreSQL for security
4. **HTTPS**: Render provides HTTPS by default
5. **CORS**: Configure FRONTEND_ORIGIN properly

## Scaling

- **Free Plan**: Good for development and testing
- **Starter Plan**: For production with guaranteed uptime
- **Pro Plan**: For high-traffic applications

Your backend should now be successfully deployed to Render! 🚀
