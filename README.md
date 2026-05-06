# Week 4 React — Tailwind assignment

This branch continues the upload exercise with Tailwind CSS and the API work used by the media views.

Local development

```bash
npm run dev
```

Environment

Ensure `.env.local` contains:

- `VITE_AUTH_API=https://media2.edu.metropolia.fi/auth-api/api/v1`
- `VITE_UPLOAD_SERVER=https://media2.edu.metropolia.fi/upload-api/api/v1`
- `VITE_MEDIA_API=https://media2.edu.metropolia.fi/media-api/api/v1`

Production build

```bash
npm run build
```

After the build, upload the entire `dist/` contents (both `index.html` and the `assets/` folder) to `public_html/tailwind/` on your WebDisk. Missing files or an incomplete upload causes 404s for JS/CSS.

Open [https://users.metropolia.fi/~elmomal/tailwind/](https://users.metropolia.fi/~elmomal/tailwind/) to view it in the browser.
