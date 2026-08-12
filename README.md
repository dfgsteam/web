# julius-hunold.de

Persönliches Dev-Portfolio als statische, extrem performante Astro-Seite mit
Scroll-Animationen im Apple-Stil. Zweisprachig (DE/EN), Content lebt als MDX in
Content Collections im Repo – kein CMS-Backend nötig.

## Tech-Stack

| Bereich     | Wahl                              |
|-------------|-----------------------------------|
| Framework   | Astro 7 (static output)           |
| Styling     | Tailwind CSS v4                   |
| Animationen | GSAP + ScrollTrigger + Lenis      |
| Icons       | Lucide (`@lucide/astro`)          |
| Content     | Astro Content Collections (MDX)   |
| SEO         | `@astrojs/sitemap`, JSON-LD, OG   |

## Commands

| Command            | Action                                       |
|--------------------|----------------------------------------------|
| `npm install`      | Dependencies installieren                    |
| `npm run dev`      | Dev-Server auf `localhost:4321` (Background-Mode: `astro dev --background`) |
| `npm run check`    | Type-Check (`astro check`)                   |
| `npm run build`    | Produktions-Build nach `./dist/`             |
| `npm run preview`  | Build lokal previewn                         |

## Projektstruktur

```text
src/
├── components/
│   ├── animations/     # TextReveal (scrubbed word reveal)
│   ├── sections/       # Hero, About, Projects, Skills, CV, Contact
│   ├── ui/             # Button, Card, StatusBadge, BrowserMockup
│   ├── Nav.astro, Footer.astro, Seo.astro, HomePage.astro, ProjectDetail.astro
├── content/
│   └── projects/       # MDX pro Projekt, unterteilt in de/ und en/
├── data/               # skills.ts (Level, Werte)
├── i18n/               # de.ts, en.ts (UI-Texte + CV-Daten)
├── layouts/            # Layout.astro (View Transitions, Fonts)
├── lib/                # i18n-Helfer
├── pages/              # index, en/index, projekte/[slug], 404
└── scripts/            # global.ts (Lenis, Cursor, Magnetic, Reveals, Pin)
```

## Neue Projekte hinzufügen

1. Datei `src/content/projects/de/<slug>.mdx` und `en/<slug>.mdx` anlegen
2. Frontmatter befüllen (siehe Schema in `src/content.config.ts`)
3. Body = Detail-Beschreibung (übersetzt in beide Sprachen)
4. `npm run check && npm run build`

Der Showcase sortiert nach `order`, die Detailseite wird automatisch unter
`/projekte/<slug>` und `/en/projekte/<slug>` generiert.

## Blog

- Posts als MDX unter `src/content/blog/de/<slug>.mdx` und `en/<slug>.mdx`
  (Schema: `title`, `date`, `excerpt`, `tags`)
- Seiten: `/blog` und `/blog/<slug>` (bzw. `/en/...`)
- Sortierung nach Datum absteigend, Sitemap automatisch inkludiert

## Porträt-/Portfolio-Bild

Platzhalter liegt in `public/portfolio.svg`. Echtes Foto ablegen (z. B.
`public/portfolio.jpg`, 4:5) und den Pfad in `src/lib/site.ts`
(`PORTFOLIO_IMAGE`) anpassen.

## Google Search Console

Verifikations-Code (Meta-Tag-Wert) in `src/lib/site.ts`
(`GOOGLE_VERIFICATION`) eintragen. Danach in der Search Console die
Sitemap `https://julius-hunold.de/sitemap-index.xml` einreichen.

## PWA / Icons

App-Icons (`icon-192`, `icon-512`, `apple-touch-icon`, `favicon-32`) in
`public/`, Manifest in `public/site.webmanifest`. Neu generieren mit dem
Skript-Muster in `/tmp` (`PIL`) oder manuell ersetzen.

## Sprachen / i18n

- Default-Locale: **deutsch** (unpräfixierte URLs), Englisch unter `/en/...`
- `hreflang`-Tags + Sitemap-Alternates automatisch via `@astrojs/sitemap`
- UI-Texte + CV-Daten: `src/i18n/{de,en}.ts`, Projekt-Content: MDX je Sprache

## Deploy

Branches: `main` = aktive Entwicklung, `prod` = production-ready (Auto-Deploy).

Workflow: Push auf `prod` → `npm run check` + `astro build` in CI → statisches
Nginx-Image nach GHCR → Rollout auf docker3/docker4 (Watchtower oder Deploy-Webhook).

Dateien: `Dockerfile`, `nginx.conf`, `docker-compose.yml`,
`.github/workflows/deploy.yml`.

Lokal bauen: `docker build -t julius-hunold-de . && docker run -p 4180:80 julius-hunold-de`
