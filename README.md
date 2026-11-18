# CSS Engineers — Corporate Website

A modern, responsive static website for **CSS ENGINEERS PRIVATE LIMITED**, an engineering and infrastructure services company.

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
- **About** — Company profile, vision, mission, capabilities, QHSE, and ISO certification
- **Services** — Transmission & distribution, O&M, civil construction, roads, engineering, and project management
- **Projects** — Existing transmission line portfolio (temporarily hidden)
- **Clients** — Existing client directory and logos
- **Gallery** — Engineering and infrastructure images
- **Engineering Work Samples** — 3 engineering and infrastructure visuals
- **Why Us** — Company strengths
- **Contact** — Address, phone, email, WhatsApp QR code, contact form, Google Map

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
│   └── images/             # Company, service, and gallery images
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
| **Location** | Chakia, Chandauli, Uttar Pradesh, India |
| **Phone** | 05413-297050 |
| **Email** | cssengineerspvtltd@gmail.com |
| **Certification** | ISO 9001:2015 CERTIFIED |

## 🔄 Updating Content

1. Edit `content/data.json` — the single source of truth
2. Refresh browser — changes appear immediately

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