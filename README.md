# Week 4 React - Routing Exercise

This branch implements React Router for multi-page navigation:

## Features

- React Router (v7.5) for multi-page navigation
- React Hooks (useState, useEffect) for state management and data fetching
- Media gallery with data from local JSON or API endpoints
- User information enrichment via Promise.all
- Full-size media viewer for images and videos
- Responsive table display with owner information

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
mkdir public_html/wsk-routing
cd public_html/wsk-routing
put dist/index.html
put dist/assets/*
exit
```

Open [Deployed app](https://users.metropolia.fi/~elmomal/wsk-routing/) to view it in the browser.
