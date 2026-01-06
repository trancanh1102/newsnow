import type { NewsItem } from "@shared/types"

export default defineSource(async () => {
  // Medium RSS feeds - will need to be called with specific URL per source
  const rss = await rss2json("https://medium.engineering/feed")
  if (!rss) return []

  const news: NewsItem[] = []
  for (const item of rss.items) {
    news.push({
      id: item.link, // Use link as ID
      title: item.title,
      url: item.link,
      extra: {
        date: item.created,
        hover: item.description,
      },
    })
  }

  return news
})
