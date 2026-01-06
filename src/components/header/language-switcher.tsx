import { motion } from "framer-motion"
import { useTranslation } from "react-i18next"

const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "vi", label: "Tiếng Việt", flag: "🇻🇳" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
] as const

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const [shown, setShown] = useState(false)

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode)
    setShown(false)
  }

  return (
    <span className="relative" onMouseEnter={() => setShown(true)} onMouseLeave={() => setShown(false)}>
      <button
        type="button"
        title={t(`language.${currentLanguage.code}`)}
        className="btn flex items-center gap-1 text-lg"
      >
        <span>{currentLanguage.flag}</span>
      </button>
      {shown && (
        <div className="absolute right-0 z-99 bg-transparent pt-4 top-4">
          <motion.div
            className={$(
              "w-150px",
              "bg-primary backdrop-blur-5 bg-op-70! rounded-lg shadow-xl",
            )}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <ol className="bg-base bg-op-70! backdrop-blur-md p-2 rounded-lg color-base text-sm">
              {languages.map(lang => (
                <li
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={$(
                    "cursor-pointer px-3 py-2 rounded-md transition-all flex items-center gap-2",
                    "hover:bg-primary/10",
                    i18n.language === lang.code && "bg-primary/20 color-primary font-bold",
                  )}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span>{lang.label}</span>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      )}
    </span>
  )
}
