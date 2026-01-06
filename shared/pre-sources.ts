import process from "node:process"
import { consola } from "consola"
import { Interval } from "./consts"
import { typeSafeObjectFromEntries } from "./type.util"
import type { OriginSource, Source, SourceID } from "./types"

const Time = {
  Test: 1,
  Realtime: 2 * 60 * 1000,
  Fast: 5 * 60 * 1000,
  Default: Interval, // 10min
  Common: 30 * 60 * 1000,
  Slow: 60 * 60 * 1000,
}

export const originSources = {
  hackernews: {
    name: "Hacker News",
    type: "hottest",
    column: "tech",
    color: "orange",
    home: "https://news.ycombinator.com",
  },
  github: {
    name: "Github",
    color: "gray",
    home: "https://github.com",
    column: "tech",
    sub: {
      "trending-today": {
        title: "Today",
        type: "hottest",
      },
    },
  },
  producthunt: {
    name: "Product Hunt",
    type: "hottest",
    column: "tech",
    color: "orange",
    home: "https://www.producthunt.com/",
  },
  openai: {
    name: "OpenAI",
    column: "tech",
    color: "green",
    home: "https://openai.com",
  },
  steam: {
    name: "Steam",
    column: "tech",
    color: "blue",
    home: "https://store.steampowered.com/",
  },
  medium: {
    name: "Medium",
    column: "tech",
    color: "gray",
    home: "https://medium.com",
    interval: Time.Common,
    sub: {
      "engineering": {
        title: "Engineering",
        home: "https://medium.engineering",
      },
      "better-programming": {
        title: "Better Programming",
        home: "https://betterprogramming.pub",
      },
      "technology": {
        title: "Technology",
        home: "https://medium.com/tag/technology",
      },
      "programming": {
        title: "Programming",
        home: "https://medium.com/tag/programming",
      },
      "javascript": {
        title: "JavaScript",
        home: "https://medium.com/tag/javascript",
      },
    },
  },
  devto: {
    name: "DEV Community",
    column: "tech",
    color: "slate",
    home: "https://dev.to",
    interval: Time.Common,
    sub: {
      latest: {
        title: "Latest",
      },
      javascript: {
        title: "JavaScript",
        home: "https://dev.to/t/javascript",
      },
      python: {
        title: "Python",
        home: "https://dev.to/t/python",
      },
      webdev: {
        title: "Web Dev",
        home: "https://dev.to/t/webdev",
      },
      react: {
        title: "React",
        home: "https://dev.to/t/react",
      },
    },
  },
  freecodecamp: {
    name: "freeCodeCamp",
    column: "tech",
    color: "green",
    home: "https://www.freecodecamp.org",
    interval: Time.Common,
  },
} as const satisfies Record<string, OriginSource>

export function genSources() {
  const _: [SourceID, Source][] = []

  Object.entries(originSources).forEach(([id, source]: [any, OriginSource]) => {
    const parent = {
      name: source.name,
      home: source.home,
      color: source.color as any,
      column: source.column as any,
      type: source.type,
      interval: source.interval ?? Time.Default,
    }

    if ("sub" in source && source.sub) {
      Object.entries(source.sub).forEach(([subId, subSource]) => {
        _.push([
          `${id}-${subId}` as SourceID,
          {
            ...parent,
            ...subSource,
          },
        ])
      })
    } else {
      _.push([id as SourceID, parent])
    }
  })

  return typeSafeObjectFromEntries(_)
}

export const sources = genSources()

if (!process.env.VITEST) {
  consola.info("sources", Object.keys(sources).length)
}
