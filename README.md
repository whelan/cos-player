# The Barovia Portal — player site

The player-facing companion site for the **Legends of Barovia** *Curse of Strahd*
campaign. It is built with [Quartz 4](https://quartz.jzhao.xyz/) and published to
**GitHub Pages**. Only the files placed in `content/` here are public — the DM
vault (`cos-rework`) stays private.

**Live site:** https://whelan.github.io/cos-player/ *(after the one-time setup below)*

What players get:

- A **portal** landing page and a growing set of shared handouts.
- A **shared session log** at the bottom of every page (Giscus). Anyone can read
  it; posting asks for a free GitHub sign-in.

---

## What's published

Only what is in `content/`. Right now that is:

| Page | Source in the DM vault |
|---|---|
| `index.md` (the Portal) | `00 - Spillerinfo/Portal.md` |
| `Player Introduction.md` | `00 - Spillerinfo/Player Introduction.md` |
| `Building Your Character.md` | `00 - Spillerinfo/Building Your Character.md` |

Deliberately **not** published: the DM vault itself, the private Ireena player
briefing, and the Count's Manor handouts (those are DM-gated props handed out at
the table).

### The site is in Danish — the DM vault isn't

The published pages here are a **Danish localization**, not 1:1 copies. The DM
vault (`cos-rework`) keeps English as its house style (see its `CLAUDE.md`), so
these `content/` files have diverged into translated adaptations. Site chrome
(search, graph view, footer, etc.) is localized too, via
`quartz/i18n/locales/da-DK.ts`, set as the `locale` in `quartz.config.ts`.

**Kept in English on purpose** (so re-translating a synced file doesn't lose
this): species/class/background/feat names, ability scores, dice notation,
Long Rest/Short Rest, weapon mastery properties, skill and saving-throw names,
and proper nouns (place names, NPC names). Phobia names use Danish clinical
terms except "Pedophobia," kept in English — its Danish spelling collides
awkwardly with an unrelated, sensitive word.

### Sharing another file

The site only ever shows what is in `content/`, so sharing is a copy **plus a
translation pass**:

1. Copy the chosen `.md` file from the DM vault into `content/` here.
2. Strip anything DM-only and keep the player voice.
3. Translate the prose to Danish, keeping the terms listed above in English —
   use judgement for anything else that reads awkwardly translated.
4. Link to it from `content/index.md` with a wiki link, e.g. `[[Madam Eva]]`.
5. Commit and push to `main` — the site redeploys automatically.

Wiki links (`[[Page]]`), Obsidian callouts, and the `ravenloft-journal` handout
classes all render here. Images are intentionally untracked in the DM vault, so
add any image you want shown directly to `content/` (or a `content/images/`
folder) and reference it with a normal relative link.

> Drafts: add `draft: true` to a file's frontmatter to keep it in the repo but
> out of the published site.

---

## One-time setup

### 1. Turn on GitHub Pages

Repo **Settings → Pages → Build and deployment → Source: GitHub Actions**.
Then merge this branch into `main` (or push to `main`); the
**Deploy Barovia Portal to GitHub Pages** workflow builds and publishes the site.

If you host at a different path or a custom domain, update `baseUrl` in
`quartz.config.ts`.

### 2. Session log / comments (Giscus) — already configured

Discussions is enabled with a **`Session Log`** category, the giscus app is
installed, and the IDs are wired into `quartz.layout.ts` (with
`GISCUS_REPO_ID` / `GISCUS_CATEGORY_ID` repo secrets as an override — the
deploy workflow reads both).

The thread is keyed per page path (`mapping: "pathname"`), so each handout keeps
its own discussion. The widget is set to `lang: "da"` to match the site.

---

## Local development

Requires Node 22+.

```bash
npm install
npx quartz build --serve   # http://localhost:8080
```

`npx quartz build` writes the static site to `public/`.

---

## Updating Quartz

This repo vendors the Quartz framework (the `quartz/` folder). To pull upstream
improvements later:

```bash
npx quartz update
```

Quartz is MIT-licensed; see `LICENSE.txt`.
