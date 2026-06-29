import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

/**
 * Giscus — shared player session log / comments.
 *
 * Comments render at the bottom of every content page. Reading is open to
 * everyone; posting requires a (free) GitHub sign-in, because the thread is
 * stored as GitHub Discussions on the cos-player repo.
 *
 * BEFORE THIS WORKS you must do the one-time setup in README.md
 * ("Session log / comments (Giscus)") and paste the two IDs below. Until then
 * the comment box simply shows a configuration notice and nothing breaks.
 *
 * The values can also be supplied at build time via the GISCUS_REPO_ID and
 * GISCUS_CATEGORY_ID environment variables (handy for the GitHub Action).
 */
const giscus = Component.Comments({
  provider: "giscus",
  options: {
    repo: "whelan/cos-player",
    repoId: process.env.GISCUS_REPO_ID ?? "REPLACE_WITH_REPO_ID",
    category: "Session Log",
    categoryId: process.env.GISCUS_CATEGORY_ID ?? "REPLACE_WITH_CATEGORY_ID",
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
