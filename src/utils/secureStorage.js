/**
 * secureStorage.js — safe wrapper around localStorage
 * Never store sensitive user data (tokens, Aadhaar, phone, passwords) in localStorage.
 * Only store non-sensitive UI preferences (language, theme).
 */

const ALLOWED_KEYS = new Set(['gramsetu_lang', 'gramsetu_theme'])

export const secureStorage = {
  setItem(key, value) {
    if (!ALLOWED_KEYS.has(key)) {
      console.warn(`[GramSetu] Blocked attempt to store "${key}" in localStorage.`)
      return
    }
    try {
      localStorage.setItem(key, String(value))
    } catch {
      /* storage full or unavailable — fail silently */
    }
  },

  getItem(key) {
    if (!ALLOWED_KEYS.has(key)) return null
    try {
      return localStorage.getItem(key)
    } catch {
      return null
    }
  },

  removeItem(key) {
    if (!ALLOWED_KEYS.has(key)) return
    try {
      localStorage.removeItem(key)
    } catch {
      /* ignore */
    }
  },
}
