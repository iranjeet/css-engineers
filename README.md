# CSS Engineers — Corporate Website

A modern, responsive static website for **CSS ENGINEERS PRIVATE LIMITED**, a transmission line survey, geotechnical, and foundation engineering company.

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/iranjeet/css-engineers.git
cd css-engineers

# Start a local HTTP server (required for fetch)
python3 -m http.server 8080

# Open in browser
open http://localhost:8080
```

## 📋 What's Included

- **Home** — Company introduction & hero
- **About** — Mission, objectives, legal information
- **Services** — 5 service categories (survey, design, geotechnical, foundation, fieldwork)
- **Projects** — 17 transmission line projects (1,700+ km)
- **Clients** — 12 major clients
- **Gallery** — 8 project samples
- **Sample Reports** — 3 technical report images
- **Equipment & Team** — Instruments, staffing, key personnel
- **Why Us** — Company strengths & stats
- **Contact** — Address, phone, email, contact form, Google Map

## 🛠 Technology

- **No build tools** — Plain HTML, CSS, JavaScript
- **No npm/dependencies** — Fully static
- **Data-driven** — All content loads from `content/data.json`
- **Responsive** — Mobile-first design
- **Accessible** — Semantic HTML, ARIA labels
- **SEO-friendly** — Meta tags, structured data

## 📁 Project Structure

```
css-engineers/
├── index.html              # Main page shell
├── content/data.json       # All site content
├── assets/
│   ├── css/styles.css      # Theme & layout
│   ├── js/main.js          # Render logic
│   └── img/                # Logos, gallery, reports
└── knowledge-base/         # Markdown docs (optional)
```

## 🎨 Design System

- **Primary Blue:** `#2ba4f0`
- **Accent Gold:** `#c9a227`
- **Fonts:** Inter (body) + Playfair Display (display)
- **Features:** Fixed header, scroll reveal, mobile nav

## 📝 Company Details

| Field | Value |
|-------|-------|
| **Legal Name** | CSS ENGINEERS PRIVATE LIMITED |
| **CIN** | U42101UP2026PTC248868 |
| **Incorporated** | 11 June 2026 |
| **Location** | Chakia, Chandauli, Uttar Pradesh, India |
| **Phone** | +91 8299080754 |
| **Email** | cssengineerspvtltd@gmail.com |

## 🔄 Updating Content

1. Edit `content/data.json` — the single source of truth
2. Optionally update `knowledge-base/*.md` (mirrors JSON)
3. Refresh browser — changes appear immediately

## 🚀 Deploy to GitHub Pages

```bash
git add .
git commit -m "CSS Engineers website"
git push origin main
```

Live at: `https://iranjeet.github.io/css-engineers/`

## 📖 Documentation

See **RECREATION.md** for detailed setup, rebuild instructions, and verification checklist.

## ©️ License

CSS ENGINEERS PRIVATE LIMITED. All rights reserved.