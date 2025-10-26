# Docker Deployment Guide for RED DOT

This guide will help you deploy your Next.js website using Docker, which works with multiple platforms including Render, Railway, and AWS.

## Prerequisites

1. Docker installed on your machine
2. A container registry account (Docker Hub, GitHub Container Registry, etc.)

## Step 1: Create Dockerfile

Create a `Dockerfile` in your project root with the following content:

```dockerfile
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

## Step 2: Update next.config.js

Update your `next.config.js` to enable standalone builds:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable standalone build for better performance
  output: 'standalone',
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Allow local images
    domains: ['localhost'],
  },
  
  // Environment variables will be set in deployment platform
  env: {
    GROQ_API_KEY: process.env.GROQ_API_KEY,
    MONGODB_URI: process.env.MONGODB_URI,
    MONGODB_DB_NAME: process.env.MONGODB_DB_NAME,
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
  },
  
  // Platform-specific optimizations
  experimental: {
    // Enable server actions
    serverActions: {
      allowedOrigins: ['localhost:3000', 'localhost:3001', 'reddot.co.in'],
    },
  },
}

module.exports = nextConfig
```

## Step 3: Build and Run Docker Image

1. Build the Docker image:
   ```bash
   docker build -t reddot-website .
   ```

2. Run the container locally to test:
   ```bash
   docker run -p 3000:3000 -e GROQ_API_KEY=your_key reddot-website
   ```

## Step 4: Deploy to Container Platforms

### Render Deployment

1. Go to [render.com](https://render.com/)
2. Create a new Web Service
3. Connect your GitHub repository
4. Set the build command to: `npm run build`
5. Set the start command to: `npm start`
6. Add environment variables in the dashboard

### Railway Deployment

1. Go to [railway.app](https://railway.app/)
2. Create a new project
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Railway will automatically detect the Dockerfile
6. Add environment variables in the dashboard

### AWS Deployment

1. Install AWS CLI and configure credentials
2. Install Elastic Beanstalk CLI
3. Initialize EB application:
   ```bash
   eb init
   ```
4. Create environment and deploy:
   ```bash
   eb create
   eb deploy
   ```

## Environment Variables

Make sure to set these environment variables in your deployment platform:

```
GROQ_API_KEY=your_groq_api_key_here
MONGODB_URI=your_mongodb_connection_string_here
MONGODB_DB_NAME=reddot-website
CONTACT_EMAIL=keerthijai909@gmail.com
```

## Troubleshooting

### Build Issues
- Ensure all dependencies are properly listed in package.json
- Check that the Dockerfile paths match your project structure
- Verify environment variables are correctly set

### Runtime Issues
- Check container logs for error messages
- Ensure all required ports are exposed
- Verify environment variables are accessible within the container

## Contact Information
- Founder: Jai Keerthi
- Location: Chennai, India
- Phone: +91 8072163133
- Email: keerthijai909@gmail.com
- LinkedIn: https://www.linkedin.com/in/jai-keerthi-03931b341