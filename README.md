# Week 4 React - Routing and Hooks

This repository has two separate versions:

- `routing` branch for the React Router assignment at `https://users.metropolia.fi/~elmomal/wsk-routing/`
- `hooks` branch for the hooks/API assignment at `https://users.metropolia.fi/~elmomal/hooks/`

## What goes where

Each branch must be built and uploaded to its own remote folder.

- `routing` branch build output goes to `~/public_html/wsk-routing/`
- `hooks` branch build output goes to `~/public_html/hooks/`

## Local test

Run the dev server with:

```bash
npm run dev
```

Open the URL Vite prints in the terminal. For the `hooks` branch, the production build is configured with:

```javascript
base: '/~elmomal/hooks/',
```

## Production build

```bash
npm run build
```

After the build, the `dist/` folder should contain `index.html` and an `assets/` folder. If the browser shows a 404 for CSS or JS, the usual cause is that only part of `dist/` was uploaded.

## View links

- `hooks`: [https://users.metropolia.fi/~elmomal/hooks/](https://users.metropolia.fi/~elmomal/hooks/)
- `routing`: [https://users.metropolia.fi/~elmomal/wsk-routing/](https://users.metropolia.fi/~elmomal/wsk-routing/)
