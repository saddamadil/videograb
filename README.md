# VidGrab (Next.js rebuild)

Full Next.js 14 (App Router, TypeScript) rebuild of the VidGrab downloader, restyled to match
saddamadil.in's neo-brutalist design system (Space Grotesk, ink/paper/lime/violet tokens, hard
offset shadows).

## What changed vs the old PHP version
- Same 9 tools (YouTube, YT→MP3, YT→MP4, Shorts, TikTok, Instagram, Facebook, Twitter, Pinterest),
  now driven by one data file (`lib/tools.ts`) instead of 9 copy-pasted HTML blocks.
- Same download flow: it calls your existing Flask backend on Render — nothing to change there.
- Restyled from the dark glassmorphism look to your saddamadil.in brutalist look: cream paper
  background, black hairline/2.5px borders, hard 4px offset shadows, lime/violet accents,
  Space Grotesk display type. Platform brand colors (YouTube red, TikTok teal, etc.) are kept as
  flat accent blocks per tool.

## Before you deploy
1. Open `lib/tools.ts` and confirm `API_BASE` still points at your live Render backend
   (`https://vidgrab-backend.onrender.com` — update if it's changed or asleep on a different plan).
2. Update the `metadataBase` / canonical URL in `app/layout.tsx` if you're deploying under a
   different domain than `vidgrab.saddamadil.in`.
3. `robots`/sitemap aren't wired up yet — say the word if you want those added.

## Local development
```bash
npm install
npm run dev
```
Visit http://localhost:3000

## Build & run in production
```bash
npm run build
npm start
```

## Deploying
This is a standard Next.js app (Node 18/20/22/24 all work). On a platform that supports the
frameworks you listed (Next.js, Node 18–24, npm/yarn/pnpm):
- Build command: `npm run build`
- Start command: `npm start`
- Or, if the platform wants a static export instead of a Node server, tell me and I'll switch
  this to `next export` — but note the download button calls an external API at runtime, so a
  Node/serverless target is the simpler fit.

This is **not** meant for Hostinger shared PHP hosting — it needs a Node runtime. If you're
deploying there too, let me know and we can keep the old PHP page live as a fallback while this
one goes on the Node-capable host.

## File map
```
app/
  layout.tsx      – <head>, fonts, metadata
  page.tsx        – assembles all sections, holds the active-tool state
  globals.css     – full design system (tokens + all component styles)
components/
  Nav.tsx         – sticky nav + platform pills
  Hero.tsx        – headline + stat chips
  Downloader.tsx  – tool tabs, the download form, and the fetch() call to your API
  HowItWorks.tsx  – 4-step strip
  ToolsGrid.tsx   – "All tools" card grid
  FAQ.tsx         – accordion
  Footer.tsx      – footer links
lib/
  tools.ts        – single source of truth for all 9 tools + API_BASE
```
