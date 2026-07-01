import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration — The Barovia Portal (player-facing site)
 *
 * Player-facing companion to the "Legends of Barovia" DM vault. Only the files
 * placed in `content/` are published here; the DM vault stays private.
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Barovia-portalen",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "da-DK",
    // GitHub Pages project site. Served at https://whelan.github.io/cos-player/
    baseUrl: "whelan.github.io/cos-player",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Cinzel",
        body: "EB Garamond",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#f3ece2",
          lightgray: "#ddd2c2",
          gray: "#9c8e7a",
          darkgray: "#3b342c",
          dark: "#241f1a",
          secondary: "#7a1420",
          tertiary: "#3c5a6e",
          highlight: "rgba(122, 20, 32, 0.10)",
          textHighlight: "#c9a04788",
        },
        darkMode: {
          light: "#15110f",
          lightgray: "#2c2722",
          gray: "#6a5f52",
          darkgray: "#cbbfae",
          dark: "#ece3d4",
          secondary: "#b3303c",
          tertiary: "#7fa0b3",
          highlight: "rgba(179, 48, 60, 0.12)",
          textHighlight: "#c9a04766",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
