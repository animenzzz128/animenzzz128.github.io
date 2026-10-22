# animenzzz128.github.io

Personal site of Jiaqi (Jacky) Yao: https://animenzzz128.github.io

A React + Vite + TypeScript app with one page per section. GitHub Actions builds it on every push to `main` and deploys it to GitHub Pages (`.github/workflows/deploy.yml`; Pages source must be set to "GitHub Actions").

```sh
npm ci
npm run dev     # http://localhost:5173
npm run build   # checks both languages and types, builds to dist/
```

| Page | Route | File |
| --- | --- | --- |
| Home (summary) | `/` | `src/pages/Home.tsx` |
| Projects | `/projects` | `src/pages/Projects.tsx`, cards from `src/projects.ts` |
| TouTouLe case study | `/projects/toutoule` | `src/pages/TouTouLe.tsx` |
| Dayweave case study | `/projects/dayweave` | `src/pages/Dayweave.tsx` |
| Experience and education | `/experience` | `src/pages/Experience.tsx` |
| About and photos | `/about` | `src/pages/About.tsx` |

- English and Chinese sit side by side (`.en` / `.zh` spans, or `<T en zh />`); the header toggle sets `data-lang` on `<html>`. `scripts/check-i18n.mjs` fails the build when a block lacks its other language.
- Page titles and share descriptions live in `src/meta.json`. `scripts/postbuild.mjs` writes an HTML file per route plus `404.html`, so direct links work on GitHub Pages.
- Old single-page anchors such as `/#dayweave` redirect to the new routes.
- `public/img/`: photos and project screenshots.
