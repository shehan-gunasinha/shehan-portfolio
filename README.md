# Shehan's Developer Portfolio

A responsive React + Vite portfolio starter.

## Before publishing
Edit `src/main.jsx` and replace the placeholder values in `PROFILE`:
- Email address
- GitHub username and project links
- LinkedIn username

Update project descriptions, links, and the internship/education dates as needed. Add your CV as `public/resume.pdf` (create the `public` directory) for the Resume button to work.

## Add your content (all in `public/`)
- **Profile photo:** `public/profile.jpg` (portrait, about 800x1000, under 300 KB). Until it exists, an initials placeholder shows.
- **Project images and demo videos:** put files in `public/media/` and list them in each project's `media` array in `src/main.jsx`:
  - `{ type: 'image', src: 'media/shot.png', caption: 'Dashboard' }`
  - `{ type: 'video', src: 'media/demo.mp4', poster: 'media/demo.png' }` (keep mp4 files under about 10 MB)
  - `{ type: 'youtube', src: 'VIDEO_ID' }` (best for long demos, upload as unlisted)
- **Certifications:** edit the `certifications` array. Add `image: 'certs/name.png'` and `credential: 'https://...'`.
- **Resume:** `public/resume.pdf`.

## Run locally
Install Node.js (LTS), then:

```bash
npm install
npm run dev
```
Open the local URL shown in the terminal.

## Build
```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages
Push to a repo on the `main` branch, then in Settings > Pages choose **GitHub Actions** as the source. The included workflow builds and publishes the site on every push.

## Deploy to Vercel
1. Push this folder to a public GitHub repository.
2. Sign in to Vercel using GitHub and import the repository.
3. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.
4. Deploy. Vercel gives you a shareable URL; you can add a custom domain later.

The Google Fonts import is optional; system fonts will be used if it is unavailable.
