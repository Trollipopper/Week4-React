# Week 4 React - Routing Exercise

This project implements React Router for multi-page navigation with the following views:

- **Home**: Displays a media gallery with images and videos
- **Profile**: User profile page
- **Upload**: Media upload page
- **Single**: Detailed view of a selected media item

## Features

- React Router navigation between pages
- Media gallery with thumbnail display
- Full-size media viewer for images and videos
- Browser back button support

## Building for Production

Before building for production, update `vite.config.mjs` and replace `your-username` with your Metropolia username:

```javascript
base: '/~your-username/wsk-routing/',
```

Then build and deploy:

```bash
npm run build
```

Copy the contents of the `dist/` folder to your Metropolia public_html directory:

```bash
scp -r dist/* your-username@shell.metropolia.fi:~/public_html/wsk-routing/
```

Open [Deployed app](https://users.metropolia.fi/~your-username/wsk-routing/) to view it in the browser.
