# UX UI MATE — self-contained Vite app

This repository contains the full UX UI MATE React/Vite project.

## Requirements

- **Node.js** 18+ (LTS recommended)
- **npm** (this repo tracks `package-lock.json`)

## One-time setup

```bash
npm ci
# or: npm install
```

## Development

```bash
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## What must stay in this folder

| Path | Purpose |
| --- | --- |
| `package.json` / `package-lock.json` | npm dependencies and scripts |
| `index.html` | Vite HTML entry |
| `vite.config.js` | Build config and path aliases |
| `jsconfig.json` | `@` → `src/`, `@vendor` → `src/assets/vendor` (editor / imports) |
| `src/` | All application source (routes, pages, components, styles) |
| `public/` | Static files served at site root (add `favicon.ico` here if you use one) |

`node_modules/` is created by `npm install`. `dist/` is created by `npm run build` and can be deleted and rebuilt anytime.

## Aliases (see `vite.config.js`)

- `@/` → `src/`
- `@vendor` → `src/assets/vendor`

## Key routes (React Router)

Defined in `src/routes/`. The UX UI MATE / Innovative Parallax and Services experiences live under the usual `src/pages/` tree.

## Package manager note

`yarn.lock` and `bun.lockb` may also be present. For consistency, use **one** tool; this README assumes **npm** and `package-lock.json`.
