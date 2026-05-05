# Week 5 React — Context assignment

This branch implements a shared `UserContext` for authentication state, protected routes, and related context hooks.

Local development

```bash
npm run dev
```

Environment

- Ensure `VITE_AUTH_API` is set in your environment for auth requests (e.g. `https://media2.edu.metropolia.fi/auth-api/api/v1`).

Production build

```bash
npm run build
```

After the build, upload the entire `dist/` contents (both `index.html` and the `assets/` folder) to `public_html/context/` on your WebDisk. Missing files or an incomplete upload causes 404s for JS/CSS.

Published URL for this branch:

- `context`: https://users.metropolia.fi/~elmomal/context/
