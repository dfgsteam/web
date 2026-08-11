# julius-hunold.de – Relaunch Plan (Astro)
## 1. Ziel
Persönliches Dev-Portfolio als statische, extrem performante Astro-Seite mit
hochwertigen Scroll-Animationen im Stil von apple.com. Fokus: Projekte,
Skills, Kontakt. Kein CMS-Backend nötig – Content lebt im Repo (Markdown/MDX
Collections).
## 2. Tech-Stack
| Bereich          | Wahl                                      | Begründung |
|-------------------|---------------------------------------------|------------|
| Framework         | **Astro 5**                                 | Islands-Architektur, minimales JS-Payload, ideal für content-lastige Portfolio-Seite |
| Styling           | **Tailwind CSS v4**                        | schnelles Utility-Styling, gute DX, passt zu deinem restlichen Stack (Tabler nutzt du bei den Apps, hier lieber schlank) |
| Animationen       | **GSAP + ScrollTrigger**                    | Industriestandard für Apple-artige Scroll-Storytelling-Effekte (Pinning, Scrubbing, Parallax); performanter und flexibler als CSS Scroll-Driven Animations, die noch nicht überall unterstützt sind |
| Interaktivität    | Astro Islands (kleine Vanilla/TS-Komponenten) statt React/Vue | kein Bedarf an einem vollen UI-Framework, hält Bundle klein |
| Content           | Astro Content Collections (MDX)            | Projekte/CV als typisierte Markdown-Dateien, versioniert im Git |
| Icons             | Lucide (wie in deinen anderen Projekten)   | Konsistenz zu deinem sonstigen Icon-Set |
| Formulare         | statisches Kontaktformular via z.B. eigenem kleinen API-Endpoint oder Mailto-Fallback | kein Backend nötig, optional später eigener Mini-Endpoint auf deiner Docker-Infra |
## 3. Projektstruktur
```
julius-hunold.de/
├── src/
│   ├── components/
│   │   ├── sections/         # Hero, About, Projects, Skills, Contact
│   │   ├── ui/                # Buttons, Cards, Nav
│   │   └── animations/        # GSAP-Wrapper-Komponenten (ScrollReveal, Pin, Parallax)
│   ├── content/
│   │   ├── projects/          # *.mdx pro Projekt
│   │   └── config.ts
│   ├── layouts/
│   ├── pages/
│   └── styles/
├── public/
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```
## 4. Content-Basis: erweiterter Lebenslauf (final, von dir bestätigt)
Content stammt 1:1 von der aktuellen Seite und wird in Astro Content Collections
überführt (`src/content/cv/*.mdx` bzw. `src/content/projects/*.mdx`), sprachlich
im "Hammer geil"-Ton geschärft, aber inhaltlich unverändert:
**About Me**
Passionierter Programmierer, Fokus auf maßgeschneiderte Web-Apps mit PHP & Python.
Spannbreite von moderner Web-App-Entwicklung (sgalinski) bis technisches
Projektmanagement (Glasfaser NE4-Ausbau, MD Telekom). Studiert Applied Computer
Science in Göttingen, vertieft parallel Physik und BWL. Ehrenamtlich aktiv, u. a.
Finanzverwaltung der Schönstatt Mannesjugend.
Alter: 23 · Sarstedt, Germany · info@julius-hunold.de · Telefon auf Anfrage
**Projekte – Clients & Freelancing**
- *Natürliche Werke* — Consulting & Webdesign (Client Project)
- *EN.MIE: Netzanmeldungen* — Custom Web App, Baustellendokumentation & Netzanmeldungs-Vorbereitung (Client Project)
- *Voltampere Exposés* — Custom Web App (im Aufbau), Wirtschaftlichkeitsprüfungen, Kundenexposés, Netzanfragen (Client Project)
**Projekte – Professional Work**
- *Jobblitz* — Custom Web App, Webdesign/CMS/Team-Entwicklung (sgalinski)
- *Tractime* — Trello-App, Zeiterfassung in Trello (sgalinski)
- *MDT APP* — Web/Mobile App, Abrechnungsvorbereitung, Baustellendoku, Planung Büro↔Techniker (MD Telekom)
- *MDL Reklame* — Reklamationsmanagement-System (MD Landmaschinen)
→ jede Karte im neuen Showcase verlinkt auf eine interne Detail-Unterseite
(`/projekte/[slug]`, "View Details →"), Status-Badge (Live / Client Project / Under
Construction); externe Live-Links können später ergänzt werden, sobald verfügbar
**Technical Skills** (für animiertes Skill-Grid mit Level-Anzeige)
Python (Master) · SQL (Expert) · PHP (Expert) · HTML (Expert) · MS Office (Master) ·
WooCommerce (Expert) · Linux/BASH (Advanced) · Java (Advanced) · TYPO3 (Advanced) ·
C++ (Medium) · Haskell (Beginner) · Assembly (Beginner) · Photoshop (Beginner)
**Work Experience**
- Web Developer @ sgalinski — Mai 2024–heute — Realisierung/Weiterentwicklung von Apps, Websites, Extensions (Web/Desktop/Mobile)
- Project Manager @ MD Telekom — Sep 2022–heute — Planung/Organisation Glasfaserausbau, branchenspezifische Software
- E-Commerce @ MD Landmaschinen — Feb–Aug 2022 — Amazon/WooCommerce-Shopverwaltung
- Julius Hunold IT Services — Dez 2021–heute — ERP/Onlineshop-Setup, Websites inkl. Hosting, IT-Beratung/Training
**Volunteer Work**
- Media Team Leader, Schönstatt Mannesjugend — 2021–2023
- Group Leader, Schönstatt Mannesjugend — 2020–heute
**Education**
- B.Sc. Business Administration, Uni Göttingen — 2024–voraussichtlich 2027
- B.Sc. Physics, Uni Göttingen — 2024–voraussichtlich 2028
- B.Sc. Applied Computer Science, Uni Göttingen — 2022–voraussichtlich 2026
- Abitur, Werner-von-Siemens-Schule Hildesheim — 2019–2022
**Certificates**
- UniCert II Englisch (B2), Uni Göttingen — 2024
- JuLeiCa Gruppenleiter-Schulung, Schönstatt Mannesjugend — 2021
**Contact**
CTA "Let's talk" + Download CV as PDF (Button bleibt, PDF-Export z. B. via
React-pdf/`@react-pdf/renderer` oder statisch gepflegtes PDF im `public/`-Ordner)
## 5. Seitenaufbau (Sections)
1. **Hero** – großer Claim, sanftes Intro (Fade/Scale beim Laden), evtl. animiertes Grid/3D-Element
2. **About** – kurzer Text zu dir, Pin-Section mit Text-Reveal beim Scrollen
3. **Projekte (Showcase)** – eigener großer Bereich für aktuelle/laufende Projekte, jede Karte verlinkt auf eine **interne Detail-Unterseite** (`/projekte/[slug]`), keine externen Live-Links (Client-Projekte haben aktuell keine öffentlichen URLs)
   - Horizontales Pin-Scrolling: Section bleibt fixiert, Projekte scrollen horizontal durch (`ScrollTrigger.pin` + `xPercent`-Tween), klassischer Apple-"Product-Showcase"-Effekt
   - Pro Projekt: großes Screenshot/Mockup (Browser-Frame), Titel, Kurzbeschreibung, Tech-Badges, Status-Tag (Live/Client Project/Under Construction)
   - Hover/Tap: Karte hebt sich leicht an (`scale` + `box-shadow`-Tween), Cursor wechselt zu "Ansehen"-Indikator
   - Klick → interne Astro-Route `/projekte/naturliche-werke`, `/projekte/en-mie`, `/projekte/voltampere` etc., mit View-Transition-Übergang (kein `target="_blank"` nötig, bleibt im Astro-Routing)
   - Detail-Seite pro Projekt: größere Screenshots/Mockups, ausführliche Beschreibung, eingesetzte Technologien, ggf. Herausforderungen/Learnings — als eigene Content-Collection-Einträge (`src/content/projects/*.mdx`), später einfach um echte Live-Links ergänzbar, sobald verfügbar
   - Mobile-Fallback: normales vertikales Card-Stacking mit Stagger-Reveal statt horizontalem Pin (Performance/UX auf Touch)
4. **Skills/Stack** – Icon-Grid mit Stagger-Animation beim Einblenden
5. **Infra/Setup** – optional: kurzer Einblick in dein Homelab/Self-Hosted-Setup als Differenzierung
6. **Kontakt** – einfache CTA-Section, evtl. Magnetic-Button-Effekt
## 6. Animationskonzept (Apple-Stil)
- **ScrollTrigger `pin`** für Sections, die während des Scrollens "stehen bleiben" und Inhalte durchwechseln (z. B. Projekt-Showcase)
- **`scrub: true`** statt Click-Trigger – Animation folgt 1:1 der Scrollposition
- **Parallax-Layer** für Hintergrundelemente (leicht versetzte Scroll-Geschwindigkeit)
- **Text-Splitting** (z. B. SplitType) für zeilenweises/wortweises Einblenden von Headlines
- **`will-change` + `transform`/`opacity`-only Animationen** für 60fps, keine Layout-Shifts
- **`prefers-reduced-motion`** konsequent respektieren – Fallback auf einfache Fades
- Lazy-Init: GSAP-Bundle nur auf Sections laden, die es brauchen (Astro Islands mit `client:visible`)
**Signature-Effekte für den "Wow"-Faktor:**
- **Custom Cursor** (verzögert nachziehend, wechselt Form über interaktiven Elementen)
- **Magnetic Buttons** (Button folgt leicht der Maus, snapt beim Verlassen zurück)
- **Smooth Scroll** via Lenis (statt nativem Scroll) – Grundlage für butterweiches Scrubbing bei allen ScrollTrigger-Animationen
- **Gradient-Mesh/Noise-Hintergrund** im Hero, subtil animiert (nicht statisch)
- **Number/Counter-Animationen** bei Skills/Stats (z. B. "5 Produkte", "X Jahre Erfahrung") beim Einscrollen
- **Page-Transition** zwischen internen Seiten (View Transitions API, von Astro nativ unterstützt) für nahtlose Wechsel
## 7. Branch- & Deploy-Strategie
- `main` – aktive Entwicklung
- `prod` – production-ready, Auto-Deploy bei Push/Merge
- Feature-Branches → PR gegen `main` → nach Review Merge in `prod`
**Deployment:** da noch offen, zwei sinnvolle Optionen für dich:
| Option | Aufwand | Passt zu deiner Infra |
|--------|---------|------------------------|
| **Docker + Nginx-Container auf docker3/docker4** | GitHub Actions Build → Image push zu GHCR → Deploy via Compose, Routing über deine bestehende Nginx Proxy Manager Instanz | ✅ konsistent mit deiner restlichen Infra, volle Kontrolle |
| **Vercel/Netlify** | Zero-Config, automatisches Preview-Deployment pro PR | ✅ am schnellsten startklar, aber losgelöst von deinem Self-Hosted-Ökosystem |
**Empfehlung:** Docker-Deploy auf docker3/docker4, analog zu deinen anderen Apps – GitHub Actions Workflow:
1. Build auf Push zu `prod`
2. `astro build` → statische Dateien in schlankes Nginx-Image
3. Image-Push zu GHCR
4. Watchtower oder Webhook-getriggerter `docker compose pull && up -d` auf dem Zielserver
5. Routing/TLS über bestehende Nginx Proxy Manager Instanz
## 8. Qualität & Performance
- Lighthouse-Ziel: 100/100 Performance (statisch, minimales JS)
- Bildoptimierung über Astro `<Image />` (WebP/AVIF, responsive srcset)
- CI-Check: `astro check` + Lighthouse-CI im Actions-Workflow vor Deploy auf `prod`
## 9. SEO
**Wichtig zuerst:** Die aktuelle Seite blockt Crawler per `robots.txt` – das
verhindert auch Indexierung durch Google. Für die neue Seite sollte das bewusst
umgekehrt werden (Crawling erlauben), sonst bringt der ganze SEO-Aufwand nichts.
- **robots.txt** – Crawling explizit erlauben (`Allow: /`), Sitemap-Verweis
- **Sitemap** – automatisch via `@astrojs/sitemap`, inkl. aller `/projekte/[slug]`-Unterseiten
- **Meta-Tags pro Seite** – Title/Description individuell pro Projekt-Detailseite (nicht generisch), via `astro-seo` oder eigenem `<SEO />`-Component
- **Canonical URLs** – gegen Duplicate Content (relevant bei künftigen Sprachversionen)
- **OpenGraph & Twitter Cards** – eigenes OG-Bild pro Projekt-Detailseite (Screenshot/Mockup), damit Links beim Teilen gut aussehen
- **Structured Data (JSON-LD)**
  - `Person`-Schema auf der Startseite (Name, Jobtitel, Skills, sameAs-Links zu LinkedIn etc.) – wichtig für Personen-Suche/Knowledge-Panel
  - `CreativeWork`/`SoftwareApplication`-Schema pro Projekt
- **Sprache/Locale — entschieden: zweisprachig, Deutsch als Default**
  - `/` bzw. `/de/...` = Deutsch (Standard), `/en/...` = Englisch
  - Astro i18n Routing (`i18n`-Config in `astro.config.mjs`, `defaultLocale: "de"`, `locales: ["de", "en"]`)
  - Content Collections pro Sprache (`src/content/cv/de/`, `src/content/cv/en/` bzw. Frontmatter-Feld `lang`)
  - `hreflang`-Tags auf jeder Seite (`de`, `en`, `x-default` → `de`)
  - Sprachumschalter in der Nav (dezenter Toggle, keine Layout-Verschiebung beim Wechsel)
  - bestehender Content (aktuell komplett Englisch) wird als EN-Version übernommen, DE-Version muss neu übersetzt/getextet werden – kannst du mir schicken oder ich schlage eine Übersetzung vor, die du gegenliest
  - Sitemap enthält beide Sprachversionen mit korrekten `hreflang`-Alternates
- **Performance als Rankingfaktor** – Core Web Vitals profitieren direkt vom Astro-Static-Ansatz + Lenis/GSAP nur bei Bedarf laden (`client:visible`), kein Blocking durch schwere JS-Bundles
- **Semantisches HTML** – echte `<h1>`–`<h3>`-Hierarchie trotz Scroll-Storytelling-Layout (Screenreader/Crawler lesen DOM-Reihenfolge, nicht visuelle Reihenfolge)
- **Alt-Texte** für alle Projekt-Screenshots/Mockups
- **Google Search Console** einrichten nach Launch, Sitemap einreichen
- **404-Seite** mit sinnvollen internen Links (kein Dead End)
## 10. Nächste Schritte
1. Repo `julius-hunold-de` anlegen, `prod`-Branch schützen (Required Reviews)
2. Astro-Projekt scaffolden (`npm create astro@latest`) + Tailwind + GSAP installieren
3. Content Collection für Projekte aus bestehenden `dfgsteam`/`hunold24`-Repos befüllen
4. Hero + eine Section end-to-end mit GSAP ScrollTrigger bauen (Proof of Concept)
5. Deploy-Pipeline (GitHub Actions → Docker → docker3/4) einrichten
6. Restliche Sections umsetzen, Performance-Pass, Launch

