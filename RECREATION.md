# CSS Engineers Website — Recreation Guide

Use this document to recreate or deploy the **CSS ENGINEERS PRIVATE LIMITED** static website on any machine.

---

## 1. What this project is

A **static one-page corporate website** for **CSS ENGINEERS PRIVATE LIMITED**, providing engineering and infrastructure services in transmission and distribution, civil construction, roads, and operation and maintenance.

**Tech stack (no build step, no npm):**

| Layer | File(s) | Role |
|-------|---------|------|
| HTML | `index.html` | Page shell with empty containers |
| CSS | `assets/css/styles.css` | Custom corporate theme |
| JavaScript | `assets/js/main.js` | Fetches JSON and renders all content |
| JSON | `content/data.json` | Runtime single source of truth |

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
│   ├── css/styles.css           # Existing theme and layout
│   ├── images/                  # Company, service, and gallery images
│   └── js/main.js               # Render logic
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
  renderServices, renderGallery, renderSampleReports,
  renderWhyUs, renderContact, renderFooter
       ↓
setupNavigation, setupScrollReveal, setupHeaderScroll
```

**Design pattern:** HTML is static structure only. All text, lists, tables, and images come from `data.json`.

**Content workflow:** Edit `content/data.json` and refresh the browser.

---

## 5. Page sections (in order)

| Section ID | Nav label | Data key | What it shows |
|------------|-----------|----------|---------------|
| `home` | Home | `company` | Hero with name, tagline, logo, CTA buttons |
| `about` | About | `about` + `company` | Company profile, capability sections, ISO certification, contact details |
| `services` | Services | `services` | 6 engineering and infrastructure service cards |
| `projects` | *(temporarily hidden)* | `projects` | Summary stats and project table retained in source |
| `clients` | Clients | `clients` | Existing client logos and directory |
| `gallery` | Gallery | `gallery` | Engineering and infrastructure images |
| `sample-reports` | *(not in nav)* | `sampleReports` | 3 engineering and infrastructure visuals |
| `why-us` | Why Us | `whyUs` | Headline and company strengths |
| `contact` | Contact | `contact` | Address, phone, email, form, Google Map |

Navigation is driven by `data.json` → `navigation` (7 visible items). The Projects section and its data are retained but temporarily hidden.

---

## 6. Company details

| Field | Value |
|-------|-------|
| **Legal name** | CSS ENGINEERS PRIVATE LIMITED |
| **Short name** | CSS Engineers Pvt. Ltd. |
| **Registered office** | C/o. Arati, 1st Floor, Derehun, Post-Chakia, Chakia, Chandauli - 232103, Uttar Pradesh, India |
| **Phone** | 05413-297050 |
| **Email** | cssengineerspvtltd@gmail.com |
| **Certification** | ISO 9001:2015 CERTIFIED |
| **Tagline** | Engineering and Infrastructure Solutions for Transmission, Civil Construction & Roads |

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
  "company": { "name", "shortName", "tagline", "logo", "favicon", "registeredOffice", "phone", "email" },
  "about": { "title", "paragraphs", "sections" },
  "services": { "title", "subtitle", "categories": [{ "id", "title", "icon", "items" }] },
  "projects": { "title", "subtitle", "columns", "items": [{ "no", "work", "km", "client" }] },
  "clients": { "title", "subtitle", "items" },
  "sampleReports": { "title", "subtitle", "items": [{ "title", "image", "alt", "desc" }] },
  "gallery": { "title", "subtitle", "items": [{ "title", "image", "alt" }] },
  "whyUs": { "title", "headline", "strengths", "stats" },
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

curl -s http://localhost:8080/content/data.json | python3 -c "import sys,json; d=json.load(sys.stdin); print(len(d['projects']['items']), 'projects'); print(len(d['clients']['items']), 'clients'); print(d['company']['phone'])"
# Expected: 17 projects (temporarily hidden), 11 clients, and 05413-297050
```

In browser:

- [ ] Navigation links point to existing sections
- [ ] ISO certification and company profile are visible
- [ ] Projects section remains in source but is hidden from the site and navigation
- [ ] Clients section remains available
- [ ] Engineering service and work-sample images load
- [ ] Contact map embeds
- [ ] No "CS Enterprises" text anywhere

---

## 20. Project history

1. **Initial site** — About, Services, Gallery, Why Us, Contact
2. **Company profile update** — Updated company content, services, contact information, and ISO certification; retained project data while temporarily hiding its section
3. **Branding** — Removed all "CS Enterprises" references; company is CSS Engineers Private Limited only

---

© CSS ENGINEERS PRIVATE LIMITED. All rights reserved.