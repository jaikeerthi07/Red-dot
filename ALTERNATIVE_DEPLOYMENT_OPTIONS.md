# Alternative Deployment Options for RED DOT

This document provides instructions for deploying your website to platforms other than Vercel.

## 1. Netlify (Recommended Alternative)

### Prerequisites
- Netlify account (free tier available)
- GitHub account

### Deployment Steps
1. Push your code to GitHub if not already done:
   ```bash
   cd c:\Users\Jaikeerthi\Videos\RED DOT
   git remote add origin https://github.com/YOUR_USERNAME/reddot-website.git
   git branch -M main
   git push -u origin main
   ```

2. Go to https://app.netlify.com/
3. Click "New site from Git"
4. Connect to GitHub
5. Select your repository
6. Configure settings:
   - Branch to deploy: main
   - Build command: `npm run build`
   - Publish directory: `.next`
7. Click "Deploy site"

### Environment Variables
In Netlify dashboard:
1. Go to Site settings > Build & deploy > Environment
2. Add these variables:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   MONGODB_URI=your_mongodb_connection_string_here
   MONGODB_DB_NAME=reddot-website
   CONTACT_EMAIL=keerthijai909@gmail.com
   ```

## 2. Render

### Prerequisites
- Render account (free tier available)

### Deployment Steps
1. Go to https://dashboard.render.com/
2. Click "New+" > "Web Service"
3. Connect your GitHub repository
4. Configure settings:
   - Name: reddot-website
   - Region: Singapore (closest to India)
   - Branch: main
   - Root Directory: leave empty
   - Runtime: Node
   - Build Command: `npm run build`
   - Start Command: `npm start`
5. Click "Create Web Service"

### Environment Variables
In Render dashboard:
1. Go to your service > Environment
2. Add these variables:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   MONGODB_URI=your_mongodb_connection_string_here
   MONGODB_DB_NAME=reddot-website
   CONTACT_EMAIL=keerthijai909@gmail.com
   ```

## 3. Railway

### Prerequisites
- Railway account (free tier available)

### Deployment Steps
1. Go to https://railway.app/
2. Click "New Project"
3. Connect your GitHub repository
4. Railway will auto-detect your Next.js app
5. Click "Deploy"

### Environment Variables
In Railway dashboard:
1. Go to your project > Settings > Variables
2. Add these variables:
   ```
   GROQ_API_KEY=your_groq_api_key_here
   MONGODB_URI=your_mongodb_connection_string_here
   MONGODB_DB_NAME=reddot-website
   CONTACT_EMAIL=keerthijai909@gmail.com
   ```

## 4. Firebase Hosting

### Prerequisites
- Firebase account
- Firebase CLI installed (`npm install -g firebase-tools`)

### Deployment Steps
1. Initialize Firebase in your project:
   ```bash
   cd c:\Users\Jaikeerthi\Videos\RED DOT
   firebase login
   firebase init hosting
   ```

2. Configure Firebase Hosting:
   - Select your Firebase project
   - Public directory: `out`
   - Configure as a single-page app: No
   - Set up automatic builds and deploys with GitHub: Yes

3. Update your package.json with export script:
   ```json
   {
     "scripts": {
       "export": "next build && next export"
     }
   }
   ```

4. Deploy:
   ```bash
   npm run export
   firebase deploy
   ```

## 5. Self-Hosting (Docker)

### Prerequisites
- Docker installed
- Server/VPS with Docker

### Deployment Steps
1. Create a Dockerfile in your project root:
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

   COPY --from=builder /app/next.config.js ./
   COPY --from=builder /app/public ./public
   COPY --from=builder /app/package.json ./package.json

   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

   USER nextjs

   EXPOSE 3000

   ENV PORT 3000

   CMD ["node", "server.js"]
   ```

2. Build and run:
   ```bash
   docker build -t reddot-website .
   docker run -p 3000:3000 -e GROQ_API_KEY=your_key reddot-website
   ```

## Platform Comparison

| Platform | Free Tier | Build Time | Bandwidth | Custom Domain | SSL |
|----------|-----------|------------|-----------|---------------|-----|
| Netlify | 100GB/mo | Generous | 100GB/mo | Yes | Automatic |
| Render | 500 build min/mo | Generous | 100GB/mo | Yes | Automatic |
| Railway | $5 credit | Generous | 1GB/mo | Yes | Automatic |
| Firebase | 10GB/mo | Limited | 360MB/day | Yes | Automatic |
| Vercel | 100GB/mo | Generous | 100GB/mo | Yes | Automatic |

## Recommendation

For your RED DOT website, I recommend **Netlify** as the best alternative to Vercel because:
1. Excellent Next.js support with their official plugin
2. Generous free tier
3. Easy deployment process
4. Built-in CI/CD
5. Great performance and reliability

## Contact Information
- Founder: Jai Keerthi
- Location: Chennai, India
- Phone: +91 8072163133
- Email: keerthijai909@gmail.com
- LinkedIn: https://www.linkedin.com/in/jai-keerthi-03931b341