# CSS Engineers Website — Recreation Guide

Use this document to recreate or deploy the **CSS ENGINEERS PRIVATE LIMITED** static website on any machine.

---

## 1. What this project is

A **static one-page corporate website** for **CSS ENGINEERS PRIVATE LIMITED** — a transmission line survey, geotechnical, and foundation engineering company in Chakia, Chandauli, Uttar Pradesh, India.

**Tech stack (no build step, no npm):**

| Layer | File(s) | Role |
|-------|---------|------|
| HTML | `index.html` | Page shell with empty containers |
| CSS | `assets/css/styles.css` | Custom corporate theme |
| JavaScript | `assets/js/main.js` | Fetches JSON and renders all content |
| JSON | `content/data.json` | Runtime single source of truth |
| Markdown | `knowledge-base/` | Human-readable content docs (keep in sync with JSON) |

**Important:** The site uses `fetch("content/data.json")`. You **must** run a local HTTP server. Opening `index.html` directly (`file://`) will fail.

---

## 2. Quick start on a new machine

### Option A — Copy the whole folder (recommended)

```bash
# On source machine
cd /path/to
zip -r css-engineers.zip css-engineers

# On new machine
unzip css-engineers.zip
cd css-engineers
python3 -m http.server 8080
# Open http://localhost:8080
```

### Option B — Git clone

```bash
git clone https://github.com/iranjeet/css-engineers.git
cd css-engineers
python3 -m http.server 8080
```

### Option C — Rebuild from scratch

Create the folder structure in section 3, copy or recreate each file, add binary assets (section 17), then serve.

---

## 3. Complete folder structure

```
css-engineers/
├── .nojekyll                    # Empty file — required for GitHub Pages
├── README.md
├── RECREATION.md                # This file
├── index.html                   # Page shell
├── content/
│   └── data.json                # ALL site content
├── assets/
│   ├── css/
│   │   └── styles.css           # Full theme
│   ├── js/
│   │   └── main.js              # Render logic
│   └── img/
│       ├── favicon.svg
│       ├── logo.jpg             # Company logo (header/hero/footer)
│       ├── main_logo.jpg        # Alternate logo (not referenced in JSON)
│       ├── gallery/             # 8 SVG placeholder images
│       │   ├── conveyor-route.svg
│       │   ├── foundation-work.svg
│       │   ├── foundation-work-2.svg
│       │   ├── hydrographical.svg
│       │   ├── mining-area.svg
│       │   ├── railway-survey.svg
│       │   ├── soil-testing.svg
│       │   └── transmission-line.svg
│       └── reports/             # Real images from company profile doc
│           ├── route-alignment-map.jpg
│           ├── line-profile.jpg
│           └── 3d-profile.jpg
└── knowledge-base/
    ├── README.md
    ├── company.md
    ├── services.md
    ├── projects.md
    ├── clients.md
    ├── equipment.md
    ├── gallery.md
    ├── why-us.md
    └── contact.md
```

---

## 4. Architecture

```
index.html (empty shells with IDs)
       ↓
main.js loads on DOMContentLoaded
       ↓
fetch("content/data.json")
       ↓
renderSite(data) calls:
  setMeta, renderNavigation, renderHero, renderAbout,
  renderServices, renderProjects, renderClients, renderGallery,
  renderSampleReports, renderEquipment, renderWhyUs,
  renderContact, renderFooter
       ↓
setupNavigation, setupScrollReveal, setupHeaderScroll
```

**Design pattern:** HTML is static structure only. All text, lists, tables, and images come from `data.json`.

**Content workflow:**

1. Edit `knowledge-base/*.md` (for humans)
2. Mirror changes in `content/data.json` (what the site reads)
3. Refresh browser

---

## 5. Page sections (in order)

| Section ID | Nav label | Data key | What it shows |
|------------|-----------|----------|---------------|
| `home` | Home | `company` | Hero with name, tagline, logo, CTA buttons |
| `about` | About | `about` + `company` | Paragraphs, Objective/Strength cards, legal sidebar |
| `services` | Services | `services` | 5 service category cards |
| `projects` | Projects | `projects` | Summary stats + 17-row project table |
| `clients` | Clients | `clients` | 12 client name cards |
| `gallery` | Gallery | `gallery` | 8 gallery image cards (SVG placeholders) |
| `sample-reports` | *(not in nav)* | `sampleReports` | 3 real report images |
| `equipment` | *(not in nav)* | `equipment` | Instruments, workforce, key person |
| `why-us` | Why Us | `whyUs` | Headline, strengths, 4 stat cards |
| `contact` | Contact | `contact` | Address, phone, email, form, Google Map |

Navigation is driven by `data.json` → `navigation` (8 items). `sample-reports` and `equipment` are on the page but not in the nav bar.

---

## 6. Company details (legal)

| Field | Value |
|-------|-------|
| **Legal name** | CSS ENGINEERS PRIVATE LIMITED |
| **Short name** | CSS Engineers Pvt. Ltd. |
| **CIN** | U42101UP2026PTC248868 |
| **Incorporated** | 11 June 2026 |
| **Act** | Companies Act, 2013 |
| **Registered office** | C/o. Arati, 1st Floor, Derehun, Post-Chakia, Chakia, Chandauli - 232103, Uttar Pradesh, India |
| **Phone** | +91 8299080754 |
| **Email** | cssengineerspvtltd@gmail.com |
| **Tagline** | Trusted Transmission Line, Survey & Geotechnical Engineering Solutions |

**Branding rule:** All content refers to **CSS Engineers Private Limited** only. Do **not** use "CS Enterprises" anywhere.

---

## 7. Source document

Original content came from **`CS Enterprises Profile.docx`** (company profile). That document included about/objective/strength, on-field and off-field services, 17 transmission line projects, sample report drawings, equipment, staff, and key person **C. S. Singh**.

For the website, everything was rebranded to **CSS Engineers Private Limited**. Three report images were extracted from the docx:

| Saved as | Docx source |
|----------|-------------|
| `assets/img/reports/route-alignment-map.jpg` | `word/media/image1.jpeg` |
| `assets/img/reports/line-profile.jpg` | `word/media/image2.jpeg` |
| `assets/img/reports/3d-profile.jpg` | `word/media/image3.jpeg` |

Re-extract on any machine:

```bash
mkdir /tmp/docx_extract && cd /tmp/docx_extract
unzip "/path/to/CS Enterprises Profile.docx" -d .
cp word/media/image1.jpeg route-alignment-map.jpg
cp word/media/image2.jpeg line-profile.jpg
cp word/media/image3.jpeg 3d-profile.jpg
```

---

## 8. `data.json` schema

```json
{
  "company": { "name", "shortName", "tagline", "logo", "favicon", "incorporated", "act", "cin", "registeredOffice" },
  "about": { "title", "paragraphs", "highlights": [{ "title", "text" }] },
  "services": { "title", "subtitle", "categories": [{ "id", "title", "icon", "items" }] },
  "projects": { "title", "subtitle", "columns", "items": [{ "no", "work", "km", "client" }] },
  "clients": { "title", "subtitle", "items" },
  "sampleReports": { "title", "subtitle", "items": [{ "title", "image", "alt", "desc" }] },
  "equipment": {
    "title", "subtitle", "instrumentsTitle", "instruments": [{ "name", "qty" }],
    "staffTitle", "staff": [{ "role", "count" }],
    "keyPerson": { "name", "role", "experience", "previous" }
  },
  "gallery": { "title", "subtitle", "items": [{ "title", "image", "alt" }] },
  "whyUs": { "title", "headline", "strengths", "stats": [{ "label", "value" }] },
  "contact": { "title", "subtitle", "phone", "email", "address", "mapQuery", "form": { "type", "action" } },
  "navigation": [{ "id", "label" }],
  "footer": { "copyright" }
}
```

The canonical copy is `content/data.json` in this repo.

---

## 19. Verification checklist

```bash
python3 -m http.server 8080
# Open http://localhost:8080

curl -s http://localhost:8080/content/data.json | python3 -c "import sys,json; d=json.load(sys.stdin); print(len(d['projects']['items']), 'projects'); print(len(d['clients']['items']), 'clients')"
# Expected: 17 projects, 12 clients
```

In browser:

- [ ] Nav shows 8 links (Home → Contact)
- [ ] Projects table has 17 rows
- [ ] Clients grid has 12 cards
- [ ] 3 sample report images load
- [ ] Contact map embeds
- [ ] No "CS Enterprises" text anywhere

---

## 20. Project history

1. **Initial site** — About, Services, Gallery, Why Us, Contact
2. **From company profile doc** — Projects, Clients, Sample Reports, Equipment & Team, expanded Services, updated stats
3. **Branding** — Removed all "CS Enterprises" references; company is CSS Engineers Private Limited only

---

© CSS ENGINEERS PRIVATE LIMITED. All rights reserved.