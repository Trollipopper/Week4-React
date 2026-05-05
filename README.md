# Week 4 React - Routing & Hooks Exercise

This project implements React Router for multi-page navigation with hooks for data fetching:

## Features

- React Router (v7.5) for multi-page navigation
- React Hooks (useState, useEffect) for state management and data fetching
- Media gallery with data from local JSON or API endpoints
- User information enrichment via Promise.all
- Full-size media viewer for images and videos
- Responsive table display with owner information

## Lab Assignments

### Lab 1: useEffect Hook with Local Data
- Created `useEffect` hook for data fetching on component mount
- Fetches test.json from public folder
- Empty dependency array `[]` ensures single execution after initial render
- Console logs appear twice in development mode (React StrictMode)

### Lab 2: API Integration with Promise.all
- Environment variables in `.env.local`:
  - `VITE_MEDIA_API` - Media API endpoint
  - `VITE_AUTH_API` - User/Auth API endpoint
- Fetches media items from API
- Uses `Promise.all()` to enrich media items with user information
- Fallback to local test.json if API is unavailable (off VPN/campus)
- All views display owner's username

## Building for Production

```bash
npm run build
```

Copy the `dist/` folder contents to your Metropolia public_html:

```bash
sftp -i ~/.ssh/id_ed25519 -o IdentitiesOnly=yes elmomal@shell.metropolia.fi
```

Then in SFTP:
```
mkdir public_html/hooks
cd public_html/hooks
put dist/index.html
put dist/assets/*
exit
```

Open [Deployed app](https://users.metropolia.fi/~elmomal/hooks/) to view it in the browser.
