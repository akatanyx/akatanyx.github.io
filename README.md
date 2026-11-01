# Portfolio

Next.js + Tailwind portfolio, exported as a static site for GitHub Pages.

## Pages

- `/` — intro, socials, links to Works and Games
- `/works/` — scrolling gallery of projects; click one to open `/works/<slug>/`
- `/games/` — tabs per game, with progress, last played, and why you left

## Editing content

| What | File |
| --- | --- |
| Name, tagline, social links, the vertical code tag | `src/lib/site.ts` |
| Design projects | `src/data/works.ts` |
| Games, progress, dates, reasons | `src/data/games.ts` |

Images go in `public/` (e.g. `public/works/cloud-web/1.png`) and are listed by path
(`"/works/cloud-web/1.png"`) in the `images` array. Anything without an image shows a grey box.

## Run locally

```bash
npm install
npm run dev
```

## Deploy

1. Push this folder to a GitHub repo. Name it `<your-username>.github.io` to serve from the root,
   or anything else to serve from `<your-username>.github.io/<repo>/`.
2. In the repo: **Settings → Pages → Source → GitHub Actions**.
3. Push to `main`. `.github/workflows/deploy.yml` builds and publishes the `out/` folder.
