# Week 4 React — Upload assignment

This branch implements file upload functionality using FormData and integration with the file server and media API.

Local development

```bash
npm run dev
```

Environment

Ensure `.env.local` contains:
- `VITE_AUTH_API=https://media2.edu.metropolia.fi/auth-api/api/v1`
- `VITE_UPLOAD_SERVER=https://media2.edu.metropolia.fi/upload-api/api/v1`
- `VITE_MEDIA_API=https://media2.edu.metropolia.fi/wsk-api/api/v1`

Production build

```bash
npm run build
```

After the build, upload the entire `dist/` contents (both `index.html` and the `assets/` folder) to `public_html/upload/` on your WebDisk. Missing files or an incomplete upload causes 404s for JS/CSS.

Published URL for this branch:

- `upload`: https://users.metropolia.fi/~elmomal/upload/
