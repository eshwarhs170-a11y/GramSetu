import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { Globe, ChevronDown, ChevronUp, Check } from 'lucide-react'

const LANGS = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'hi', label: 'Hindi',   native: 'हिन्दी' },
]

export default function LanguageSwitcher({ variant = 'default' }) {
  const { lang, setLang } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const activeLang = LANGS.find(l => l.code === lang) || LANGS[0]

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`lang-dropdown-container ${variant}`} ref={dropdownRef}>
      <button
        type="button"
        className="lang-dropdown-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <Globe size={15} strokeWidth={2} style={{ flexShrink: 0, opacity: 0.8 }} />
        <span className="lang-label">{activeLang.native}</span>
        {isOpen
          ? <ChevronUp size={13} strokeWidth={2.5} />
          : <ChevronDown size={13} strokeWidth={2.5} />
        }
      </button>

      {isOpen && (
        <ul className="lang-dropdown-menu">
          {LANGS.map(l => (
            <li key={l.code}>
              <button
                type="button"
                className={`lang-dropdown-item ${lang === l.code ? 'active' : ''}`}
                onClick={() => { setLang(l.code); setIsOpen(false) }}
              >
                <span className="item-label">{l.native} ({l.label})</span>
                {lang === l.code && <Check size={14} strokeWidth={2.5} className="item-check" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
