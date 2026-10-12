---
target: homepage
total_score: 18
p0_count: 0
p1_count: 2
timestamp: 2026-08-13T11-10-17Z
slug: src-pages-index-astro
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2/4 | Decorative availability, uptime, and progress signals imply operating status without supporting evidence. |
| 2 | Match System / Real World | 2/4 | The client-facing portfolio repeatedly adopts infrastructure-dashboard language. |
| 3 | User Control and Freedom | 2/4 | Pinned service and project sequences constrain natural scanning on desktop. |
| 4 | Consistency and Standards | 2/4 | The German homepage mixes English labels such as “Active” and “Phase” with German content. |
| 5 | Error Prevention | 1/4 | The contact form signals completion after launching `mailto:`, before any message can be sent. |
| 6 | Recognition Rather Than Recall | 3/4 | The fixed navigation, filters, command palette, and direct contact options are easy to find. |
| 7 | Flexibility and Efficiency | 3/4 | Keyboard command palette, vCard, copy-email, skills filters, and dark mode support repeat visitors. |
| 8 | Aesthetic and Minimalist Design | 1/4 | Thirteen homepage sections and competing decorative systems dilute the main conversion path. |
| 9 | Error Recovery | 1/4 | A missing mail client or clipboard failure gives the visitor no recovery route. |
| 10 | Help and Documentation | 1/4 | The page does not establish a concise engagement model, scope, or what happens after an enquiry. |
| **Total** | | **18/40** | **Needs a focused conversion and credibility pass** |

## Anti-Patterns Verdict

**LLM assessment:** The page has substantial AI/template signals: Inter with animated gradient type, grid/noise/glow effects, rounded translucent cards, two marquees, custom cursor, status widgets, and pinned scroll storytelling. Each treatment is competent in isolation, but their accumulation makes the site read as a generic “developer portfolio OS” rather than evidence-led work for a specific kind of client. The hero-metric pattern and CSS grid background are direct mismatches with the current design guidance.

**Deterministic scan:** The detector reported 0 findings for `src/pages/index.astro`. This is a scope limitation rather than a clean bill of health: the homepage composition is in imported components and `src/styles/global.css`, while the detector was run against the route entrypoint as required. It did not catch the system-level presentation issues identified in the design review.

**Visual overlays:** Browser automation and mutable script injection are unavailable in this session. No user-visible overlay was created. Static source review and `npm run check` were used as fallback evidence.

## Overall Impression

The site makes a strong first impression of technical range and polish, but it asks prospective clients to work too hard to understand the offer. The highest-leverage change is to replace repeated self-description and simulated operational UI with immediate case-study outcomes and a clear path to an enquiry.

## What's Working

- The hero establishes the broad offer and provides immediate routes to projects and contact in `src/components/sections/Hero.astro:55-84`.
- The project content has credible operational detail, especially the MDTelekom field-workflow story in `src/content/projects/de/mdt-app.mdx:15-54`.
- The practical utilities are unusually complete: command palette, vCard, direct email, and printable CV in `src/components/CommandPalette.astro` and `src/components/sections/Contact.astro`.

## Priority Issues

### [P1] Contact form reports a false success

**What:** `src/components/sections/Contact.astro:169-182` opens a `mailto:` URL then immediately displays the success status.

**Why it matters:** Visitors can abandon the mail client flow, have no configured client, or cancel it. The site still tells them that their message is on the way, risking lost leads and damaging trust.

**Fix:** Use a real form endpoint with pending, success, and recoverable error states. If retaining `mailto:`, make the button explicitly open the visitor’s mail app and never represent that action as delivery.

**Suggested command:** `$impeccable harden src/components/sections/Contact.astro`

### [P1] Services fail progressive enhancement

**What:** Service cards are absolutely positioned at `src/components/sections/ServicesSection.astro:42-53` and only become normal flow through client-side animation code.

**Why it matters:** With scripts unavailable or delayed, cards can overlap, leaving the service offer incomplete or inaccessible.

**Fix:** Make all service cards normal-flow by default. Apply the pinned stack only after JavaScript enhancement and preserve conventional scrolling for reduced motion.

**Suggested command:** `$impeccable harden src/components/sections/ServicesSection.astro`

### [P2] Case evidence arrives too late

**What:** `src/components/HomePage.astro:38-51` places several profile and decorative sections around the projects, then continues with infrastructure, AI, skills, CV, blog, and social proof.

**Why it matters:** A prospective client needs proof that a similar problem was solved before they need a tool inventory or a career timeline. The page starts confident, then turns into a long catalogue of capabilities.

**Fix:** Move two or three outcome-led case studies directly after the hero. Condense infrastructure, skills, CV, and AI into secondary routes or smaller supporting sections.

**Suggested command:** `$impeccable distill src/components/HomePage.astro`

### [P2] Dashboard theatre weakens trust

**What:** `src/components/sections/InfraSection.astro:14-56` presents named server nodes, “online” status, and implementation-detail architecture as a simulated operating console.

**Why it matters:** Static availability and architecture claims feel unverified. They compete with the actual project evidence and make the offer harder to classify: independent developer, managed host, AI consultant, or technical project manager.

**Fix:** Replace this with a short “Hosting & Betrieb” capability tied to concrete client benefits, maintenance practices, and the kinds of engagements that include it.

**Suggested command:** `$impeccable quieter src/components/sections/InfraSection.astro`

### [P3] Visual language has too many borrowed signals

**What:** The gradient text at `src/styles/global.css:129-133`, grid backdrop at `src/styles/global.css:86-90`, glow system at `src/styles/global.css:219-239`, blur-heavy card treatments, custom cursor, and multiple tickers accumulate across the homepage.

**Why it matters:** The page loses its own point of view. Decorative effects compete with the portfolio artifacts and make the work feel like a template even when the content is genuine.

**Fix:** Keep one purposeful visual device. Remove decorative grid/noise/glow treatments, replace universal cards with project artifacts, and use a solid accent for important type rather than gradient text.

**Suggested command:** `$impeccable quieter src/pages/index.astro`

## Persona Red Flags

**Sophie, prospective client:** She arrives with an operational problem and wants evidence of similar outcomes. Before reaching the project work, she must pass biography, workstyle, a portfolio banner, and a ticker; then later she is asked to parse infrastructure, AI, skills, CV, blog, and social sections. The offer feels broad rather than clearly matched to her problem.

**Martin, cautious buyer:** The static “Betriebsbereit” nodes and absolute language around data sovereignty and compliance can be read as guarantees. Without scope, evidence, or qualification, he may question whether these are contractual services or presentational claims.

**Lea, mobile first-timer:** The page contains many interactive-looking effects and long animated sequences. If her mail application is unavailable, the contact form can show success without giving her an alternative way to complete her enquiry.

## Minor Observations

- `src/components/sections/AiSection.astro:232` references `var(--accent)`, while the theme token is `--color-accent` in `src/styles/global.css:36`.
- The German route mixes English labels such as “High Efficiency”, “Active”, and “Phase” in the AI section.
- `npm run check` passes with 0 errors and 53 hints, including deprecated Lucide icon names, unused imports, and Astro’s `is:inline` hint for JSON-LD.
- No critique ignore list exists at `.impeccable/critique/ignore.md`.

## Questions to Consider

1. Which three client problems should this homepage be known for: streamlining manual operations, launching commercial sites, or running custom systems?
2. Can each featured project state one concrete before/after outcome, such as time saved, errors reduced, turnaround improved, or users served?
3. Is managed hosting an explicit contractual service, or should the infrastructure material be repositioned as supporting delivery capability?
