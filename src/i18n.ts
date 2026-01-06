import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

import en from "./locales/en.json"
import vi from "./locales/vi.json"
import zh from "./locales/zh.json"

const resources = {
  en: { translation: en },
  vi: { translation: vi },
  zh: { translation: zh },
}

i18n
  .use(LanguageDetector) // Detect user language
  .use(initReactI18next) // Pass i18n instance to react-i18next
  .init({
    resources,
    fallbackLng: "en", // Fallback language
    lng: undefined, // Let detector determine initial language
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ["localStorage", "navigator"], // Check localStorage first, then browser language
      caches: ["localStorage"], // Cache user's language choice
      lookupLocalStorage: "i18nextLng", // Key for localStorage
    },
  })

export default i18n
