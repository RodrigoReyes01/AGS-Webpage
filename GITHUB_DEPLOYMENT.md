# GitHub Deployment Guide - AGS Static Website

## Option 1: Create a New Repository for Static Files Only (Recommended)

### Step 1: Create a new GitHub repository
1. Go to https://github.com/new
2. Repository name: `ags-static` (or any name you prefer)
3. Description: "AGS Aviation Ground Solutions - Static Website"
4. Choose: Public or Private
5. **DO NOT** initialize with README, .gitignore, or license
6. Click "Create repository"

### Step 2: Initialize and push the static files

Run these commands in your terminal:

```bash
# Navigate to the out folder
cd out

# Initialize a new git repository
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit - AGS static website"

# Add your GitHub repository as remote (replace with your actual repo URL)
git remote add origin https://github.com/YOUR_USERNAME/ags-static.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages (Optional)
1. Go to your repository on GitHub
2. Click "Settings" → "Pages"
3. Under "Source", select "Deploy from a branch"
4. Select branch: `main` and folder: `/ (root)`
5. Click "Save"
6. Your site will be available at: `https://YOUR_USERNAME.github.io/ags-static/`

**Note**: You'll need to update the links if deploying to GitHub Pages with a subdirectory.

---

## Option 2: Add to Existing Repository as a Branch

### Step 1: Create a new branch for static files

```bash
# Make sure you're in the project root
cd /path/to/ags-webpage

# Create and switch to a new branch
git checkout -b gh-pages

# Remove all files except the out folder
git rm -rf .
git checkout HEAD -- out/

# Move everything from out/ to root
mv out/* .
mv out/.* . 2>/dev/null || true
rmdir out

# Add and commit
git add .
git commit -m "Deploy static site"

# Push to GitHub
git push origin gh-pages
```

### Step 2: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click "Settings" → "Pages"
3. Under "Source", select branch: `gh-pages` and folder: `/ (root)`
4. Click "Save"

---

## Option 3: Use GitHub Actions for Automatic Deployment

Create a workflow file that automatically builds and deploys on push:

### Step 1: Create workflow file

```bash
# In your main project (not in out folder)
mkdir -p .github/workflows
```

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy Static Site

on:
  push:
    branches: [ main ]
  workflow_dispatch:

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
      
    - name: Disable middleware
      run: mv middleware.ts middleware.ts.backup || true
      
    - name: Build static site
      run: npm run build
      
    - name: Restore middleware
      run: mv middleware.ts.backup middleware.ts || true
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./out
```

### Step 2: Push the workflow

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions deployment workflow"
git push origin main
```

### Step 3: Enable GitHub Pages
1. Go to Settings → Pages
2. Select source: `gh-pages` branch
3. The workflow will automatically deploy on every push to main

---

## Quick Commands Reference

### For New Repository (Option 1):
```bash
cd out
git init
git add .
git commit -m "Initial commit - AGS static website"
git remote add origin https://github.com/YOUR_USERNAME/ags-static.git
git branch -M main
git push -u origin main
```

### For Existing Repository Branch (Option 2):
```bash
git checkout -b gh-pages
git rm -rf .
git checkout HEAD -- out/
mv out/* .
rmdir out
git add .
git commit -m "Deploy static site"
git push origin gh-pages
```

---

## Important Notes

1. **Replace URLs**: Update `YOUR_USERNAME` with your actual GitHub username
2. **GitHub Pages URL**: Will be `https://YOUR_USERNAME.github.io/REPO_NAME/`
3. **Custom Domain**: You can configure a custom domain in GitHub Pages settings
4. **HTTPS**: GitHub Pages provides free HTTPS automatically
5. **Build Time**: GitHub Pages may take a few minutes to deploy

---

## Troubleshooting

### If links don't work on GitHub Pages:
You may need to update the base path in `next.config.js`:

```javascript
const nextConfig = {
  output: 'export',
  basePath: '/ags-static', // Add your repo name here
  images: { 
    unoptimized: true 
  }
}
```

Then rebuild:
```bash
mv middleware.ts middleware.ts.backup
npm run build
mv middleware.ts.backup middleware.ts
```

---

## Recommended: Option 1 (Separate Repository)

This is the cleanest approach:
- ✅ Keeps static files separate from source code
- ✅ Smaller repository size
- ✅ Easier to deploy to other hosting services
- ✅ No need to manage branches

---

**Need help?** Let me know which option you'd like to use!
