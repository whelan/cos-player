# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The player-facing companion site for the **Legends of Barovia** *Curse of Strahd* campaign — a [Quartz 4](https://quartz.jzhao.xyz/) build deployed to GitHub Pages at https://whelan.github.io/cos-player/. Only files in `content/` are published; the DM vault (`cos-rework`) stays private. See `README.md` for the technical setup (Pages, Giscus, sharing workflow).

## Default language: Danish

**The site's default language is Danish.** All published content (`content/`) and the site's own UI chrome are translated to Danish. This is a deliberate, standing decision — not something to re-ask about per page or per session.

The DM vault (`cos-rework`) keeps English as its own house style (see its `CLAUDE.md`) — so files copied from there are **translated adaptations**, not 1:1 copies. Expect `content/` to diverge from its vault source over time.

### What stays in English

Translate narrative, instructional, and flavor text to Danish. Keep the following in English, because translating them produces confusing or unrecognizable results for players used to English character sheets and D&D materials:

- **D&D mechanical terms and named game elements:** species, class, and background names (Acolyte, Wayfarer, Dusk Elf, Vistani, etc.), feat names (Origin feat, Healer, etc.), ability scores (STR/DEX/CON/INT/WIS/CHA), skill names (Perception, Stealth, etc.), saving throw names, dice notation (d20, 2d4+2, CR 1/8), **Long Rest** / **Short Rest** (explicit exception — kept English even though the DM vault itself uses "lang hvile" in its own Danish text), Weapon Mastery property names (Cleave, Graze, etc.), named subspecies traits (Curse's Rage, Shapechanger, etc.).
- **Proper nouns:** place names (Barovia, Vallaki, Waterdeep, Daggerford, …), NPC names (Strahd, Madam Eva, …), named factions/groups, service names (GitHub).
- **Anything else that reads awkwardly translated.** Use judgement — this list isn't exhaustive. Example already applied: the phobia table (`Building Your Character.md`) uses Danish clinical terms (akrofobi, klaustrofobi, …) for every entry *except* "Pedophobia," which stays English because its Danish spelling ("pædofobi") collides visually with an unrelated, sensitive word.

### Translated even though it's "part of the game"

Some things read as narrative/flavor rather than mechanical, so they *are* translated despite being D&D-adjacent:

- The safety phrase **"pause for a second"** → **"pause et øjeblik"** — it's actually spoken aloud at the table, so it should be natural to say in the players' own language, unlike a rules term tied to a character sheet.
- Table flavor text (Fateful Relationships, Quirks, Flaws, Bonds, hometown descriptions, etc.) — these are prose, not rules, so they're fully Danish.
- Page titles, headings, and site navigation labels (e.g. "Building Your Character" → "Byg din karakter," "Player Introduction" → "Spillerintroduktion").

### How the site UI is localized

`quartz/i18n/locales/da-DK.ts` provides the Danish translation for Quartz's own chrome (search, graph view, table of contents, backlinks, footer, 404 page, tag pages). It's registered in `quartz/i18n/index.ts` and activated via `locale: "da-DK"` in `quartz.config.ts`. The Giscus comment widget (`quartz.layout.ts`) is set to `lang: "da"` to match.

When adding new site-level UI strings (new components, new layout text), add the Danish string to `da-DK.ts` rather than leaving default English text in place.

### Writing style: no contrastive negation

Danish prose on this site must **not use contrastive negation** — the "not X, but Y" / "ikke X, men Y" shape (e.g. *"Det var ikke en formalitet, men en forventningsafstemning"*, *"Ikke af glæde, men så folk ikke spørger"*). State the thing directly and affirmatively instead. This mirrors `cos-rework`'s house rule for read-aloud text and dialogue, applied here to all Danish content since the whole site is Danish by default. Don't use this construction — if you think a specific instance would genuinely read better with it, ask before writing it rather than defaulting to it.

### Page structure convention

Every published page should set a Danish `title:` in its frontmatter (not just rely on the H1) so the Explorer sidebar, browser tab, and internal links all show the Danish title consistently. Link to other pages with an alias so the display text is Danish while the underlying slug stays stable: `[[Building Your Character|Byg din karakter]]`.

## Sharing another file from the DM vault

See `README.md`'s "Sharing another file" section for the full steps. In short: copy the file into `content/`, strip DM-only material, **translate the prose to Danish** using the rules above, add a Danish `title:` frontmatter, link it from `content/index.md` with an aliased wiki link, then commit and push to `main` (the site redeploys automatically).
