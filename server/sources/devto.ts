import type { NewsItem } from "@shared/types"

export default defineSource(async () => {
  const rss = await rss2json("https://dev.to/feed")
  if (!rss) return []

  const news: NewsItem[] = []
  for (const item of rss.items) {
    news.push({
      id: item.link,
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
