# Railway Deployment Guide for RED DOT

This guide will help you deploy your Next.js website to Railway, an excellent alternative platform to Vercel and Netlify.

## Prerequisites

1. A [Railway account](https://railway.app/)
2. A GitHub account
3. This project ready to be pushed to a Git repository

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com/) and log in to your account
2. Click the "+" icon in the top right corner and select "New repository"
3. Give your repository a name (e.g., "reddot-website")
4. Optionally add a description
5. Choose to make it Public or Private
6. **Do NOT initialize with a README**, .gitignore, or license
7. Click "Create repository"

## Step 2: Push Your Code to GitHub

In your terminal, run the following commands (replace `your-username` and `your-repo-name` with your actual GitHub username and repository name):

```bash
git remote add origin https://github.com/your-username/your-repo-name.git
git branch -M main
git push -u origin main
```

If you're using SSH (recommended for security), use this instead:

```bash
git remote add origin git@github.com:your-username/your-repo-name.git
git branch -M main
git push -u origin main
```

## Step 3: Import Your Project to Railway

1. Go to [railway.app](https://railway.app/) and sign in
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Connect to GitHub and select your repository
5. Railway will automatically detect your Next.js project

## Step 4: Configure Environment Variables

In the Railway dashboard:

1. Go to your project > Settings > Variables
2. Add these variables:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   MONGODB_URI=your_mongodb_connection_string_here
   MONGODB_DB_NAME=reddot-website
   CONTACT_EMAIL=keerthijai909@gmail.com
   ```

## Step 5: Deploy

1. Railway will automatically start building your project
2. Wait for the build to complete
3. Your website will be available at a railway.app subdomain

## Step 6: Custom Domain (Optional)

1. In your Railway project, go to Settings > Domains
2. Add your custom domain
3. Follow Railway's DNS configuration instructions

## Environment Variables Required

Make sure to update the environment variables in Railway to match your production settings:

1. `GROQ_API_KEY` - Your Groq API key (get it from https://console.groq.com/)
2. `MONGODB_URI` - Your MongoDB connection string (for production database)
3. `MONGODB_DB_NAME` - Your MongoDB database name
4. `CONTACT_EMAIL` - Your contact email address

## MongoDB Configuration

For production, you should use a cloud MongoDB service like MongoDB Atlas instead of a local database.

## Troubleshooting

### Build Issues
If you encounter build issues:
1. Check the build logs in the Railway dashboard
2. Ensure all environment variables are properly set
3. Verify your dependencies are correctly listed in package.json

### Environment Variables Not Working
- Make sure environment variables are added in the Railway project settings
- Check that variable names match exactly what your application expects
- Restart the deployment after adding new environment variables

### Database Connection Issues
- Verify your MongoDB URI is correct and accessible from Railway
- Check that your database has the proper IP whitelist settings (if using MongoDB Atlas)
- Ensure your database credentials are correct

## Useful Railway Commands

If you prefer to deploy using the Railway CLI:

```bash
# Install Railway CLI globally
npm install -g @railway/cli

# Login to Railway
railway login

# Initialize Railway in your project
railway init

# Deploy your project
railway up
```

For more information, visit the [Railway documentation](https://docs.railway.app/).

## Contact Information
- Founder: Jai Keerthi
- Location: Chennai, India
- Phone: +91 8072163133
- Email: keerthijai909@gmail.com
- LinkedIn: https://www.linkedin.com/in/jai-keerthi-03931b341