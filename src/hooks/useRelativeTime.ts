import { useMount } from "react-use"
import { useTranslation } from "react-i18next"

/**
 * changed every minute
 */
const timerAtom = atom(0)

timerAtom.onMount = (set) => {
  const timer = setInterval(() => {
    set(Date.now())
  }, 60 * 1000)
  return () => clearInterval(timer)
}

function useVisibility() {
  const [visible, setVisible] = useState(true)
  useMount(() => {
    const handleVisibilityChange = () => {
      setVisible(document.visibilityState === "visible")
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  })
  return visible
}

export function useRelativeTime(timestamp: string | number) {
  const [time, setTime] = useState<string>()
  const timer = useAtomValue(timerAtom)
  const visible = useVisibility()
  const { t } = useTranslation()

  useEffect(() => {
    if (visible) {
      const t_time = relativeTime(timestamp, t)
      if (t_time) {
        setTime(t_time)
      }
    }
  }, [timestamp, timer, visible, t])

  return time
}
