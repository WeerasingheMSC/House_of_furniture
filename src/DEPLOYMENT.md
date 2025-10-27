# Deployment Guide - House of Furniture ERP

This guide covers various deployment options for your ERP system.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended)

**Why Vercel?**
- Zero configuration
- Automatic HTTPS
- Global CDN
- Free tier available
- Perfect for React/Vite apps

**Steps:**

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/furniture-erp.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel auto-detects Vite settings
   - Click "Deploy"

3. **Done!** Your app is live at `https://your-app.vercel.app`

### Option 2: Netlify

**Steps:**

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy via Netlify CLI**
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify init
   netlify deploy --prod
   ```

   Or drag and drop the `dist` folder to [app.netlify.com/drop](https://app.netlify.com/drop)

**Netlify Configuration:**
Create `netlify.toml` in root:
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Option 3: GitHub Pages

**Steps:**

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/furniture-erp",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.ts**
   ```typescript
   export default defineConfig({
     base: '/furniture-erp/',
     // ... rest of config
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

## 🐳 Docker Deployment

### Create Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Create nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Build and Run Docker

```bash
# Build image
docker build -t furniture-erp .

# Run container
docker run -p 8080:80 furniture-erp

# Or with docker-compose
docker-compose up -d
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
    environment:
      - NODE_ENV=production
```

## ☁️ Cloud Platform Deployment

### AWS (S3 + CloudFront)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Create S3 bucket**
   ```bash
   aws s3 mb s3://furniture-erp
   ```

3. **Upload files**
   ```bash
   aws s3 sync dist/ s3://furniture-erp --delete
   ```

4. **Enable static website hosting**
   ```bash
   aws s3 website s3://furniture-erp --index-document index.html --error-document index.html
   ```

5. **Create CloudFront distribution** for CDN and HTTPS

### Google Cloud Platform (Firebase Hosting)

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Configure firebase.json**
   ```json
   {
     "hosting": {
       "public": "dist",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

4. **Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

### Azure Static Web Apps

1. **Create Azure Static Web App** via Azure Portal

2. **Configure GitHub Actions** (auto-created)

3. **Update workflow file**
   ```yaml
   app_location: "/"
   api_location: ""
   output_location: "dist"
   ```

## 🔧 Environment Variables

For production, create environment variables:

### Vercel
- Add in Dashboard → Settings → Environment Variables

### Netlify
```bash
netlify env:set VITE_API_URL "https://api.yoursite.com"
```

### Docker
Update docker-compose.yml:
```yaml
environment:
  - VITE_API_URL=https://api.yoursite.com
```

## 🔒 Security Checklist

Before deploying:

- [ ] Remove console.logs
- [ ] Set up HTTPS (most platforms do this automatically)
- [ ] Configure CORS for API calls
- [ ] Add security headers
- [ ] Implement rate limiting
- [ ] Add authentication
- [ ] Sanitize user inputs
- [ ] Use environment variables for sensitive data
- [ ] Enable error tracking (Sentry, LogRocket)
- [ ] Set up monitoring

## 📊 Performance Optimization

### Pre-deployment checklist:

1. **Analyze bundle size**
   ```bash
   npm run build -- --report
   ```

2. **Optimize images**
   - Compress logo and images
   - Use WebP format
   - Implement lazy loading

3. **Code splitting**
   ```typescript
   const Dashboard = lazy(() => import('./components/Dashboard'))
   ```

4. **Enable gzip/brotli compression**

5. **Add caching headers**

## 🔍 Monitoring Setup

### Add Analytics

**Google Analytics:**
```html
<!-- In index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
```

**Sentry (Error Tracking):**
```bash
npm install @sentry/react
```

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production",
});
```

## 🔄 CI/CD Setup

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 📱 Progressive Web App (PWA)

To make your app installable:

1. **Add manifest.json**
```json
{
  "name": "House of Furniture ERP",
  "short_name": "HoF ERP",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0A2540",
  "theme_color": "#F5954A",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

2. **Add service worker**
```bash
npm install vite-plugin-pwa -D
```

## 🆘 Troubleshooting

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Check Node.js version: `node --version`

### Deployment Fails
- Check build logs
- Verify environment variables
- Ensure all dependencies are in `dependencies`, not `devDependencies`

### 404 on Routes
- Configure SPA routing (see platform-specific configs above)
- Ensure `index.html` fallback is configured

---

## 🎉 Post-Deployment

After successful deployment:

1. ✅ Test all features
2. ✅ Check mobile responsiveness  
3. ✅ Verify all API endpoints work
4. ✅ Test authentication flow
5. ✅ Monitor performance metrics
6. ✅ Set up backup strategy
7. ✅ Configure domain (if needed)
8. ✅ Enable SSL/HTTPS
9. ✅ Set up error monitoring
10. ✅ Create documentation for users

**Congratulations! Your ERP system is now live! 🚀**
