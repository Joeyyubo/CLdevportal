# Deployment Guide

This document provides instructions for deploying your PatternFly prototype to various hosting platforms.

## 📁 Build Output

The project builds to the `dist/` directory. This contains static HTML, CSS, and JavaScript files that can be served by any static hosting service.

## 🚀 Deployment Options

### Option 1: Vercel (Recommended for Ease)

Vercel provides the simplest deployment experience with automatic deployments.

#### Prerequisites
- A GitHub account
- The project code pushed to a GitHub repository

#### Steps

1. **Push your code to GitHub** (if not already done):
   ```bash
   cd patternfly-react-seed
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up" and connect your GitHub account
   - Click "Add New Project"
   - Import your GitHub repository
   - Configure the project:
     - **Root Directory:** `patternfly-react-seed`
     - **Framework Preset:** Other
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
   - Click "Deploy"

3. **Your prototype will be live** at `https://your-project.vercel.app`

#### Manual Vercel CLI Deployment (Alternative)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project directory
cd patternfly-react-seed
vercel

# Follow the prompts and your site will be live
```

---

### Option 2: Netlify

Similar to Vercel, Netlify offers easy deployment with continuous integration.

#### Prerequisites
- A GitHub account
- The project code pushed to a GitHub repository

#### Steps

1. **Push your code to GitHub** (if not already done)

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Click "Sign up" and connect your GitHub account
   - Click "Add new site" → "Import an existing project"
   - Select your GitHub repository
   - Configure build settings:
     - **Base directory:** `patternfly-react-seed`
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
   - Click "Deploy site"

3. **Your prototype will be live** at `https://your-project.netlify.app`

#### Manual Netlify CLI Deployment (Alternative)

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build the project
cd patternfly-react-seed
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

---

### Option 3: Surge (Fastest for Quick Sharing)

Surge is great for quick, temporary deployments without requiring a GitHub repository.

#### Prerequisites
- Node.js installed (which you already have)

#### Steps

1. **Install Surge CLI**:
   ```bash
   npm install -g surge
   ```

2. **Build the project** (already done, but you can rebuild):
   ```bash
   cd patternfly-react-seed
   npm run build
   ```

3. **Deploy to Surge**:
   ```bash
   # Deploy from the dist directory
   cd dist
   surge
   ```

4. **Follow the prompts**:
   - First time: Create an account with your email and choose a password
   - Domain: Enter a unique subdomain (e.g., `your-prototype-name`) or use the suggested random one
   - Project: `./` (current directory, which is the dist folder)
   - Press Enter to confirm

5. **Your prototype will be live** at `https://your-chosen-domain.surge.sh`

#### Useful Surge Commands
```bash
# Deploy to a specific domain
surge dist your-domain.surge.sh

# List your deployments
surge list

# Update an existing deployment
surge dist your-domain.surge.sh
```

---

### Option 4: GitHub Pages

For hosting directly from your GitHub repository.

#### Steps

1. **Install gh-pages**:
   ```bash
   cd patternfly-react-seed
   npm install --save-dev gh-pages
   ```

2. **Add deployment script to package.json**:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

4. **Configure GitHub Pages**:
   - Go to your repository on GitHub
   - Settings → Pages
   - Source: `gh-pages` branch
   - Save

5. **Your prototype will be live** at `https://your-username.github.io/your-repo-name`

---

## 🎯 Quick Commands Reference

### Build
```bash
npm run build
```

### Test the build locally
```bash
npm run start  # Runs on http://localhost:8080
```

### Deploy to Surge (Quick)
```bash
npm run build
cd dist
surge
```

### Deploy to Vercel (Quick)
```bash
npm i -g vercel
vercel
```

---

## 📝 Notes

- **Routing**: Since you're using React Router, you'll need to configure your hosting provider to handle client-side routing:
  - **Vercel**: Automatically handles this
  - **Netlify**: Use a `_redirects` file in the `public` folder with `/* /index.html 200`
  - **Surge**: Use a `200.html` file (copy of `index.html`)
  - **GitHub Pages**: Configure a 404.html that redirects to index.html

### Adding Proper SPA Routing Support

For Surge or static hosts that don't automatically handle client-side routing:

1. **Copy index.html to 200.html** (in the dist folder before deploying):
   ```bash
   cd dist
   cp index.html 200.html
   ```

This ensures all routes redirect to your React app.

---

## 🔗 Recommended: Vercel

For this prototype, I recommend using **Vercel** because:
- ✅ Automatic deployments from GitHub
- ✅ Automatic HTTPS
- ✅ Handles React Router out of the box
- ✅ Custom domains included
- ✅ Zero configuration needed
- ✅ Great performance and CDN

---

## 🤝 Sharing Your Prototype

Once deployed, you can share your prototype with:
- Engineering team
- Design team
- Stakeholders
- Users for testing

Just share the URL they provided (e.g., `https://your-project.vercel.app`)

