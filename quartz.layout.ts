import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { FileTrieNode } from "./quartz/util/fileTrie"

/**
 * Pages under content/unlisted/ build and are reachable by direct URL (for a
 * DM to hand a specific player, the same way Ireena's PC briefing or a
 * background hook is shared 1:1), but this filterFn hides the whole folder
 * from the Explorer sidebar tree. They're also excluded from
 * Search/Sitemap/RSS/Graph via a matching check in
 * quartz/plugins/emitters/contentIndex.tsx — keep the two in sync.
 *
 * NB: the folder is named "unlisted", not "private" — Quartz's own
 * `ignorePatterns` config already treats a literal "private" folder as
 * excluded from the build entirely, which would make these pages
 * unreachable even via direct URL.
 */
const explorerFilterFn = (node: FileTrieNode) =>
  node.slugSegment !== "tags" && node.slugSegment !== "unlisted"

/**
 * Giscus — shared player session log / comments.
 *
 * Comments render at the bottom of every content page. Reading is open to
 * everyone; posting requires a (free) GitHub sign-in, because the thread is
 * stored as GitHub Discussions on the cos-player repo, in the "Session Log"
 * category. IDs below are from giscus.app's generated config for this repo;
 * they can be overridden at build time via GISCUS_REPO_ID / GISCUS_CATEGORY_ID.
 *
 * NOTE: the workflow always sets these two env vars from repo secrets, and
 * GitHub Actions substitutes an *empty string* (not undefined) for a secret
 * that doesn't exist. `??` only falls back on null/undefined, so it silently
 * let "" through and shipped a giscus widget with blank IDs. Use `||` instead
 * so an empty string also falls back to the hardcoded default.
 */
const giscus = Component.Comments({
  provider: "giscus",
  options: {
    repo: "whelan/cos-player",
    repoId: process.env.GISCUS_REPO_ID || "R_kgDOTIzrBA",
    category: "Session Log",
    categoryId: process.env.GISCUS_CATEGORY_ID || "DIC_kwDOTIzrBM4DAPJf",
    // One thread per page, keyed on the page path (stable across renames of the title).
    mapping: "pathname",
    themeUrl: "https://giscus.app/themes",
    lightTheme: "light",
    darkTheme: "dark_dimmed",
    inputPosition: "top",
    lang: "da",
  },
})

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      Spillerintroduktion: "/Player-Introduction",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({ filterFn: explorerFilterFn }),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
  // Shared session log / comments at the bottom of every page.
  afterBody: [giscus],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({ filterFn: explorerFilterFn }),
  ],
  right: [],
}
