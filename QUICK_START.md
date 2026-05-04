# Week 4 React Router - Complete Implementation Guide

## ✅ What's Been Completed

Your React Router app is fully developed, tested, and ready for deployment to Metropolia.

### App Features
- **5 Page Views**: Home (gallery), Profile, Upload, Single (detail), Navigation (Layout)
- **Full Routing**: BrowserRouter with nested routes and Link navigation
- **Media Gallery**: Table display with image thumbnails and metadata
- **Media Viewer**: Full-page display for images and videos with back button
- **State Management**: Media items passed via React Router state
- **Styling**: Responsive CSS with modal-like presentation

### Built & Tested
- ✅ All routing working locally at `http://localhost:5173/~elmomal/wsk-routing/`
- ✅ Images load from real APIs (The Cat API, cataas.com)
- ✅ Videos play in HTML5 player with controls
- ✅ Navigation between all pages works
- ✅ Back button returns to previous page
- ✅ Production build optimized (49 modules, 236KB)

### Files Included
- `src/App.jsx` - Router configuration
- `src/components/Layout.jsx` - Navigation menu
- `src/components/MediaRow.jsx` - Gallery row component
- `src/views/Home.jsx` - Media gallery page
- `src/views/Profile.jsx` - Profile placeholder
- `src/views/Upload.jsx` - Upload placeholder
- `src/views/Single.jsx` - Media detail viewer
- `dist/` - Production build (ready to deploy)

## 📦 Deployment Tools Provided

### 1. Verification Script (Run First)
```bash
.\verify.bat
```
This checks:
- ✓ npm is installed
- ✓ dist folder exists
- ✓ All build files present
- ✓ Git repository status
- ✓ Ready for deployment

### 2. Automated Deployment Script
```bash
.\deploy.bat
```
This will:
- Build the app: `npm run build`
- Connect to Metropolia: `sftp elmomal@shell.metropolia.fi`
- Create deployment directory
- Upload all files to `~/public_html/wsk-routing/`

### 3. Manual Deployment (If Scripts Fail)
```bash
sftp elmomal@shell.metropolia.fi
```

Then in SFTP prompt:
```
mkdir public_html/wsk-routing
cd public_html/wsk-routing
put dist/index.html
put dist/assets/*
exit
```

## 🚀 Quick Start

### Step 1: Verify
```bash
.\verify.bat
```

### Step 2: Deploy
```bash
.\deploy.bat
```

### Step 3: Verify Live
Visit: `https://users.metropolia.fi/~elmomal/wsk-routing/`

## 📝 Submission

The project is on GitHub at:
```
https://github.com/Trollipopper/Week4-React/tree/routing
```

Submit this link to Oma along with proof of deployment.

## 🔧 Troubleshooting

### SSH Key Error
**Problem**: `Permission denied (publickey)`
**Solution**: Use SFTP with password (deploy.bat does this automatically)

### Build Fails
**Problem**: `npm run build` errors
**Solution**: 
- Run: `npm install`
- Try again: `npm run build`

### Files Don't Upload
**Problem**: SFTP connection fails
**Solution**:
- Check internet connection
- Verify Metropolia VPN is connected if required
- Use manual SFTP commands with your password

### App Shows Blank Page
**Problem**: Nothing displays after deployment
**Solution**:
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for errors (F12)
- Verify URL: `https://users.metropolia.fi/~elmomal/wsk-routing/`
- NOT `http://` (must be HTTPS)

## 📚 Documentation Files

- `README.md` - Project overview
- `DEPLOYMENT.md` - Detailed deployment instructions
- `COMPLETION_CHECKLIST.md` - Full checklist of what's done
- `deploy.bat` - Windows deployment script
- `deploy.sh` - Mac/Linux deployment script
- `verify.bat` - Verification script

## 🎯 Next Steps

1. Run `verify.bat` to confirm everything is ready
2. Run `deploy.bat` to deploy to Metropolia
3. Test the live app
4. Submit GitHub link to Oma

Good luck! 🚀
