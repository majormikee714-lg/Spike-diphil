# DIPHIL WORLD – Tactical Datalink Website (Jekyll / GitHub Pages)

Modern responsive website for **DIPHIL WORLD** (Datalink Operator / Technician services).

Converted and upgraded for **Jekyll + GitHub Pages** with local optimized images.

## Features
- Company: **DIPHIL WORLD**
- All “Book” buttons open WhatsApp with pre-filled message to **+234 811 971 4460**
- Direct “WhatsApp Call” button
- AI support chat bubble on every page
- Local high-quality tactical / aviation / naval / electronics imagery (no external Unsplash dependency)
- Dark premium tech theme (Tailwind CDN + custom CSS)
- Pages: Home · Explore · Profile · History

## Image assets
All images live under `assets/images/` and are referenced via Jekyll `relative_url` so they work correctly with or without a `baseurl`.

| File | Usage |
|------|--------|
| `aircraft-hero.jpg` | Hero & background aircraft |
| `naval.jpg` | Naval / ship communications |
| `electronics.jpg` | Control systems / equipment |
| `uav.jpg` | UAV / drone operations |
| `secure-systems.jpg` | COMSEC & secure systems |
| `joint-ops.jpg` | Multi-platform / joint ops |
| `tech-report.jpg` | Technical reporting |
| `satellite.jpg` | Satellite communications |
| `troubleshooting.jpg` | Electronics troubleshooting |
| `field-engineer.jpg` | Field engineer / flightline |

## Deploy to GitHub Pages

### Option A – Project site (recommended)
1. Create a new repository (e.g. `diphil-world` or `datalink-site`).
2. Push this folder as the **root** of the repo (or put contents in `/docs`).
3. In repo **Settings → Pages**:
   - Source: **Deploy from a branch**
   - Branch: `main` (or `master`)
   - Folder: `/ (root)` or `/docs`
4. If the site is a **project site** (not `username.github.io`), edit `_config.yml`:
   ```yaml
   url: "https://YOUR_USERNAME.github.io"
   baseurl: "/REPO_NAME"
   ```
5. Wait 1–2 minutes; site will be at `https://YOUR_USERNAME.github.io/REPO_NAME/`.

### Option B – User / organization site
- Repo name must be `YOUR_USERNAME.github.io`
- Leave `baseurl: ""` and set `url` accordingly.

### Local preview
```bash
bundle install
bundle exec jekyll serve
# open http://127.0.0.1:4000
```

Or without Ruby:
```bash
npx serve .
```

## Original static deploy
You can still drag the folder to Vercel / Netlify; the Liquid tags will simply be ignored if not processed, but for correct paths prefer the Jekyll build on GitHub Pages.

## Contact
WhatsApp: +234 811 971 4460
