# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A static site ("PdA Talentos") that lists programmers formed by the NGO Programadores do Amanhã (PdA) and lets visitors contact them directly (WhatsApp/email) to hire them for freelance projects. No backend, no build step, no dependencies — plain HTML/CSS/JS.

## Running locally

The page loads `data/students.json` via `fetch`, which fails under `file://` due to CORS. Always serve it:

```
python -m http.server 8000
```

Then open `http://localhost:8000`. There is no build, lint, or test tooling in this repo.

## Architecture

- `index.html` — single-page markup; the `#students-grid` container is populated entirely at runtime by JS, not server-rendered.
- `js/main.js` — fetches `data/students.json` once on load into the `students` array, then renders/filters purely client-side (`renderStudents`, `applyFilters`). Search and area-filter both re-derive their result set from the in-memory `students` array — there's no server round-trip per filter.
- `data/students.json` — the only data source for talent profiles. Adding/removing/editing a talent means editing this file; there is no admin UI or CMS.
- Contact flow: clicking "Entrar em contato" on a card calls `openContactModal(student)`, which builds a prefilled `wa.me` link and a `mailto:` link from that student's own `whatsapp`/`email` fields — there's no shared contact form or backend endpoint.
- All user-facing strings (labels, buttons) are in Portuguese; keep new UI text consistent with that.
- `escapeHtml()` in `js/main.js` is used whenever student data is interpolated into innerHTML — preserve this when adding new fields to avoid reintroducing an XSS surface, even though the current data is trusted/static.

## Content conventions (student profiles)

Each entry in `data/students.json` should follow the pattern used by existing entries: `resultadoConcreto` must state a concrete, measurable outcome for a client (e.g. "reduced X by Y%"), not a vague skill claim — this reflects the PdA "Cliente no Centro" / High Agency framing that the site's copy is built around. Keep new profiles in this style rather than generic bios.
