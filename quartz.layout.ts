import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

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
  },
})

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      "Player Introduction": "/Player-Introduction",
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
    Component.Explorer(),
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
    Component.Explorer(),
  ],
  right: [],
}
