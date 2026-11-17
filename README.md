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
- The home page opens with a six-second film (`src/components/Intro.tsx` plays it, `src/opening/scene.ts` draws it with three.js, loaded only when it plays). It runs once per visit and is skipped for reduced motion, no WebGL, data saver and WeChat. `/?intro=3.2` holds the frame at 3.2 s for tuning.
- Motion: `src/motion.ts` runs Lenis (smooth wheel scrolling) on GSAP's ticker and keeps ScrollTrigger in step with it. The home page uses ScrollTrigger to bring cards in, and one component copied unchanged from [React Bits](https://reactbits.dev) into `src/reactbits/` (`SplitText` for section headings; licence in that folder). To add another: fetch `https://reactbits.dev/r/<Name>-TS-CSS.json` and save its files there.
- First download: only the home page, React and the router. Every other page is a `lazy()` route in `src/App.tsx`; GSAP and Lenis are never imported directly, only through `import('../motion')` and the lazy `SplitHeading`, so they load after first paint and the page still works if they fail.
- Fonts are self-hosted through `@fontsource` packages (`src/fonts.ts`), with no request to Google Fonts. Latin faces ship with the main stylesheet; the Chinese display face loads after first paint, and the Chinese text face only on the Chinese version. `vite.config.ts` drops the `.woff` fallbacks.
- Old single-page anchors such as `/#dayweave` redirect to the new routes.
- `public/img/`: photos and project screenshots. Each project screenshot has a 960px copy beside it (`name-960.ext`) that `srcSet()` in `src/projects.ts` offers to phones and the home wall; regenerate it when the screenshot changes. `public/og/`: share-preview images, rendered by `scripts/og/render.cjs`.
