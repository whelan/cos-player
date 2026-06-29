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

Deliberately **not** published: the DM vault itself, the private Ireena player
briefing, and the Count's Manor handouts (those are DM-gated props handed out at
the table).

### Sharing another file

The site only ever shows what is in `content/`, so sharing is a copy:

1. Copy the chosen `.md` file from the DM vault into `content/` here.
2. Strip anything DM-only and keep the player voice.
3. Link to it from `content/index.md` with a wiki link, e.g. `[[Madam Eva]]`.
4. Commit and push to `main` — the site redeploys automatically.

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

### 2. Session log / comments (Giscus)

The comment thread needs a few IDs before it lights up. Until then the comment
box just shows a configuration notice — nothing else breaks.

1. Repo **Settings → General → Features → enable _Discussions_**.
2. In Discussions, add a category named **`Session Log`** (Announcement-type is a
   good fit so only maintainers open threads).
3. Install the **[giscus GitHub App](https://github.com/apps/giscus)** on this repo.
4. Go to **https://giscus.app**, enter `whelan/cos-player`, pick the `Session Log`
   category, and copy the generated **`data-repo-id`** and **`data-category-id`**.
5. Provide those two IDs in **either** way:
   - paste them into `quartz.layout.ts` (replace `REPLACE_WITH_REPO_ID` /
     `REPLACE_WITH_CATEGORY_ID`), **or**
   - add them as repository secrets `GISCUS_REPO_ID` and `GISCUS_CATEGORY_ID`
     (the deploy workflow already reads these).

The thread is keyed per page path (`mapping: "pathname"`), so each handout keeps
its own discussion.

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
