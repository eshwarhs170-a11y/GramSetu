import { createContext, useContext, useState } from 'react'
import translations from '../translations/translations'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en')
  const t = (key) => translations[lang]?.[key] ?? translations['en'][key] ?? key
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}

export { default as Trans } from '../components/Trans'

