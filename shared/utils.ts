import type { TFunction } from "i18next"

export function relativeTime(timestamp: string | number, t?: TFunction) {
  if (!timestamp) return undefined
  const date = new Date(timestamp)
  if (Number.isNaN(date.getDay())) return undefined

  const now = new Date()
  const diffInSeconds = (now.getTime() - date.getTime()) / 1000
  const diffInMinutes = diffInSeconds / 60
  const diffInHours = diffInMinutes / 60

  // If no translation function provided, use Chinese as fallback
  if (!t) {
    if (diffInSeconds < 60) {
      return "刚刚"
    } else if (diffInMinutes < 60) {
      const minutes = Math.floor(diffInMinutes)
      return `${minutes}分钟前`
    } else if (diffInHours < 24) {
      const hours = Math.floor(diffInHours)
      return `${hours}小时前`
    } else {
      const month = date.getMonth() + 1
      const day = date.getDate()
      return `${month}月${day}日`
    }
  }

  // Use translation function
  if (diffInSeconds < 60) {
    return t("time.justNow")
  } else if (diffInMinutes < 60) {
    const minutes = Math.floor(diffInMinutes)
    return t("time.minutesAgo", { count: minutes })
  } else if (diffInHours < 24) {
    const hours = Math.floor(diffInHours)
    return t("time.hoursAgo", { count: hours })
  } else {
    const month = date.getMonth() + 1
    const day = date.getDate()
    return t("time.monthDay", { month, day })
  }
}

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function randomUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function randomItem<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}
