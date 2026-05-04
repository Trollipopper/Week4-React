# Deployment Instructions for Week 4 React Router App

## Pre-Deployment Checklist ✅
- [x] React Router fully implemented with 5 views
- [x] All routes working correctly locally
- [x] Production build successful (49 modules, ~236KB)
- [x] vite.config.mjs configured with base path `/~elmomal/wsk-routing/`
- [x] README.md updated with deployment link
- [x] All changes committed to routing branch on GitHub

## Current Build Files
- `dist/index.html` - Main HTML file
- `dist/assets/index-[hash].css` - Stylesheet
- `dist/assets/index-[hash].js` - JavaScript bundle

## Deployment to Metropolia

### Using SFTP (Recommended - Password Authentication)

1. Open your terminal/PowerShell
2. Run this command:
   ```bash
   sftp elmomal@shell.metropolia.fi
   ```

3. Enter your **Metropolia password** when prompted

4. In the SFTP prompt, execute these commands one at a time:
   ```
   mkdir public_html/wsk-routing
   cd public_html/wsk-routing
   put dist/index.html
   put dist/assets/*
   exit
   ```

### Result
Your app will be live at: **https://users.metropolia.fi/~elmomal/wsk-routing/**

## App Features
- Home: Media gallery with cat images and video
- Profile: Placeholder profile page  
- Upload: Placeholder upload page
- Single: Full-screen media viewer with back button

## GitHub Repository
Branch: `routing`
URL: https://github.com/Trollipopper/Week4-React/tree/routing
