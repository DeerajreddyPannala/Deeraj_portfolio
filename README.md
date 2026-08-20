# Portfolio Website

A static portfolio site (HTML/CSS/JS, no build step) styled like a network‑security
monitoring dashboard — built for a Network Security Engineer profile.

## Files

- `index.html` — page structure and content
- `style.css` — all styling
- `script.js` — nav toggle, uptime clock, log ticker animation

## Before you publish — replace these placeholders

| Where | What to change |
|---|---|
| `index.html` `<title>` | Your name |
| Hero section | "Your Name", tagline, "Based in" / "Currently at" |
| Projects section | Swap the 3 placeholder cards for real projects + links |
| Certifications section | Fill in real certifications (or delete the section) |
| Contact section | Email, GitHub URL, LinkedIn URL |
| Footer | "Your Name" |

Search the file for `your.email@example.com`, `yourusername`, and `Your Name` to find every spot.

## Deploy with GitHub Pages

1. Create a new repository on GitHub (e.g. `your-portfolio`).
2. Push these three files (`index.html`, `style.css`, `script.js`) to the repo root:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio site"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-portfolio.git
   git push -u origin main
   ```
3. In the repo on GitHub: **Settings → Pages → Source**, select the `main` branch and `/ (root)` folder, then save.
4. Your site will be live at `https://yourusername.github.io/your-portfolio/` within a minute or two.

If you want it at `https://yourusername.github.io` directly (no subpath), name the repo
`yourusername.github.io` instead.

## Local preview

Just open `index.html` in a browser — no server or build step required.
