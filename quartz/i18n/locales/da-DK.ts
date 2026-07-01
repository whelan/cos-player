import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "Uden navn",
    description: "Ingen beskrivelse angivet",
  },
  components: {
    callout: {
      note: "Note",
      abstract: "Resumé",
      info: "Info",
      todo: "Husk",
      tip: "Tip",
      success: "Success",
      question: "Spørgsmål",
      warning: "Advarsel",
      failure: "Fejl",
      danger: "Fare",
      bug: "Bug",
      example: "Eksempel",
      quote: "Citat",
    },
    backlinks: {
      title: "Tilbagelinks",
      noBacklinksFound: "Ingen tilbagelinks fundet",
    },
    themeToggle: {
      lightMode: "Lys tilstand",
      darkMode: "Mørk tilstand",
    },
    readerMode: {
      title: "Læsetilstand",
    },
    explorer: {
      title: "Filoversigt",
    },
    footer: {
      createdWith: "Lavet med",
    },
    graph: {
      title: "Graf-visning",
    },
    recentNotes: {
      title: "Seneste sider",
      seeRemainingMore: ({ remaining }) => `Se ${remaining} mere →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `Indlejring af ${targetSlug}`,
      linkToOriginal: "Link til original",
    },
    search: {
      title: "Søg",
      searchBarPlaceholder: "Søg efter noget",
    },
    tableOfContents: {
      title: "Indhold",
    },
    contentMeta: {
      readingTime: ({ minutes }) => `${minutes} min. læsning`,
    },
  },
  pages: {
    rss: {
      recentNotes: "Seneste sider",
      lastFewNotes: ({ count }) => `Seneste ${count} sider`,
    },
    error: {
      title: "Ikke fundet",
      notFound: "Denne side er enten privat, eller også findes den ikke.",
      home: "Tilbage til forsiden",
    },
    folderContent: {
      folder: "Mappe",
      itemsUnderFolder: ({ count }) =>
        count === 1 ? "1 side i denne mappe." : `${count} sider i denne mappe.`,
    },
    tagContent: {
      tag: "Tag",
      tagIndex: "Tag-indeks",
      itemsUnderTag: ({ count }) =>
        count === 1 ? "1 side med dette tag." : `${count} sider med dette tag.`,
      showingFirst: ({ count }) => `Viser de første ${count} tags.`,
      totalTags: ({ count }) => `Fandt i alt ${count} tags.`,
    },
  },
} as const satisfies Translation
