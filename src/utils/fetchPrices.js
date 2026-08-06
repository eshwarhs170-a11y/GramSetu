/**
 * fetchPrices.js
 * Fetches live Karnataka APMC prices from data.gov.in (AGMARKNET API).
 * Falls back to baseline hardcoded prices if API is unavailable.
 * Uses localStorage to track yesterday's prices and compute daily change.
 */

const RESOURCE_ID = '9ef84268-d588-465a-a308-a864a43d0070'
// Public demo key from data.gov.in — register at https://data.gov.in for a personal key
const API_KEY = import.meta.env.VITE_AGMARKNET_KEY || '579b464db66ec23bdd000001cdd3946e44ce4aead310bc1d4cef38b'
const CACHE_KEY = 'gramSetu_prices_cache'
const CACHE_TTL_MS = 60 * 60 * 1000 // 1 hour

// Maps AGMARKNET commodity names → our display format
const CROP_META = {
  'Ragi':       { name: 'Ragi (ರಾಗಿ)',          unit: 'per quintal',   img: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=150&q=80', market: 'APMC Bengaluru' },
  'Areca Nut':  { name: 'Areca Nut (ಅಡಿಕೆ)',     unit: 'per quintal',   img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=150&q=80', market: 'APMC Shimoga' },
  'Arecanut':   { name: 'Areca Nut (ಅಡಿಕೆ)',     unit: 'per quintal',   img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=150&q=80', market: 'APMC Shimoga' },
  'Coffee':     { name: 'Coffee (ಕಾಫಿ)',          unit: 'per quintal',   img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=150&q=80', market: 'APMC Chikkamagaluru' },
  'Silk Cocoon':{ name: 'Silk Cocoon (ರೇಷ್ಮೆ)',  unit: 'per kg',        img: 'https://images.unsplash.com/photo-1605333396915-47ed6b68a04e?w=150&q=80', market: 'Silk Exchange, Ramanagara' },
  'Jowar':      { name: 'Jowar (ಜೋಳ)',            unit: 'per quintal',   img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=150&q=80', market: 'APMC Dharwad' },
  'Maize':      { name: 'Maize (ಮೆಕ್ಕೆಜೋಳ)',    unit: 'per quintal',   img: 'https://images.unsplash.com/photo-1551754626-78724e3960d7?w=150&q=80', market: 'APMC Davangere' },
  'Tomato':     { name: 'Tomato (ಟೊಮೇಟೊ)',       unit: 'per kg',        img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=150&q=80', market: 'APMC Kolar' },
  'Onion':      { name: 'Onion (ಈರುಳ್ಳಿ)',        unit: 'per kg',        img: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=150&q=80', market: 'APMC Gadag' },
  'Sugarcane':  { name: 'Sugarcane (ಕಬ್ಬು)',     unit: 'per tonne',     img: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?w=150&q=80', market: 'APMC Mandya' },
  'Turmeric':   { name: 'Turmeric (ಅರಿಶಿನ)',     unit: 'per quintal',   img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=150&q=80', market: 'APMC Chamarajanagar' },
  'Coconut':    { name: 'Coconut (ತೆಂಗಿನಕಾಯಿ)',  unit: 'per 100 nuts',  img: 'https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?w=150&q=80', market: 'APMC Tumkuru' },
  'Groundnut':  { name: 'Groundnut (ಕಡಲೆಕಾಯಿ)', unit: 'per quintal',   img: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=150&q=80', market: 'APMC Chitradurga' },
}

// Authoritative baseline prices (MSP / 2025-26 Karnataka APMC averages)
export const BASELINE_PRICES = [
  { crop: 'Ragi (ರಾಗಿ)',          unit: 'per quintal',  price: '₹4,050', change: '+₹64',  trend: 'up',      market: 'APMC Bengaluru',           img: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=150&q=80' },
  { crop: 'Areca Nut (ಅಡಿಕೆ)',     unit: 'per quintal',  price: '₹49,500',change: '+₹800', trend: 'up',      market: 'APMC Shimoga',              img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=150&q=80' },
  { crop: 'Coffee (ಕಾಫಿ)',          unit: 'per quintal',  price: '₹20,500',change: '-₹300', trend: 'down',    market: 'APMC Chikkamagaluru',       img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=150&q=80' },
  { crop: 'Silk Cocoon (ರೇಷ್ಮೆ)',  unit: 'per kg',       price: '₹580',   change: '+₹15',  trend: 'up',      market: 'Silk Exchange, Ramanagara', img: 'https://images.unsplash.com/photo-1605333396915-47ed6b68a04e?w=150&q=80' },
  { crop: 'Jowar (ಜೋಳ)',            unit: 'per quintal',  price: '₹3,350', change: '-₹21',  trend: 'down',    market: 'APMC Dharwad',              img: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=150&q=80' },
  { crop: 'Maize (ಮೆಕ್ಕೆಜೋಳ)',    unit: 'per quintal',  price: '₹2,280', change: '+₹55',  trend: 'up',      market: 'APMC Davangere',            img: 'https://images.unsplash.com/photo-1551754626-78724e3960d7?w=150&q=80' },
  { crop: 'Tomato (ಟೊಮೇಟೊ)',       unit: 'per kg',       price: '₹28',    change: '+₹6',   trend: 'up',      market: 'APMC Kolar',                img: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=150&q=80' },
  { crop: 'Onion (ಈರುಳ್ಳಿ)',        unit: 'per kg',       price: '₹22',    change: '-₹3',   trend: 'down',    market: 'APMC Gadag',                img: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=150&q=80' },
  { crop: 'Sugarcane (ಕಬ್ಬು)',     unit: 'per tonne',    price: '₹3,400', change: '₹0',    trend: 'neutral', market: 'APMC Mandya',               img: 'https://images.unsplash.com/photo-1593113630400-ea4288922497?w=150&q=80' },
  { crop: 'Turmeric (ಅರಿಶಿನ)',     unit: 'per quintal',  price: '₹13,800',change: '+₹300', trend: 'up',      market: 'APMC Chamarajanagar',       img: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=150&q=80' },
  { crop: 'Coconut (ತೆಂಗಿನಕಾಯಿ)',  unit: 'per 100 nuts', price: '₹2,050', change: '+₹80',  trend: 'up',      market: 'APMC Tumkuru',              img: 'https://images.unsplash.com/photo-1589883661923-6476cb0ae9f2?w=150&q=80' },
  { crop: 'Groundnut (ಕಡಲೆಕಾಯಿ)', unit: 'per quintal',  price: '₹6,650', change: '-₹130', trend: 'down',    market: 'APMC Chitradurga',          img: 'https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=150&q=80' },
]

/** Format a raw number as ₹ with Indian commas */
const fmt = (n) => '₹' + Math.round(n).toLocaleString('en-IN')

/** Parse ₹ string back to a number */
const parsePrice = (str) => parseFloat(String(str).replace(/[₹,]/g, '')) || 0

/**
 * Fetch live APMC prices for Karnataka from data.gov.in.
 * Returns an array in the same shape as BASELINE_PRICES, or null on failure.
 */
export async function fetchLivePrices() {
  // Check localStorage cache first (valid for 1 hour)
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}')
    if (cached.ts && Date.now() - cached.ts < CACHE_TTL_MS && cached.data?.length) {
      console.log('[Prices] Using cached data from', new Date(cached.ts).toLocaleTimeString())
      return cached.data
    }
  } catch (_) {}

  try {
    const url = `https://api.data.gov.in/resource/${RESOURCE_ID}?api-key=${API_KEY}&format=json&filters[state.keyword]=Karnataka&limit=200`
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const json = await res.json()
    const records = json.records || json.data || []
    if (!records.length) throw new Error('Empty response')

    // Load yesterday's prices from localStorage for change computation
    const prevKey = 'gramSetu_prev_prices'
    const prevMap = JSON.parse(localStorage.getItem(prevKey) || '{}')

    // Deduplicate: pick the first record per commodity
    const seen = new Set()
    const mapped = []

    for (const r of records) {
      const commodity = r.commodity || r.Commodity || ''
      const meta = CROP_META[commodity]
      if (!meta || seen.has(meta.name)) continue
      seen.add(meta.name)

      const modal = parseFloat(r.modal_price || r.Modal_Price || 0)
      if (!modal) continue

      const prev = prevMap[meta.name] || modal
      const delta = modal - prev
      const trend = delta > 0 ? 'up' : delta < 0 ? 'down' : 'neutral'
      const changeStr = delta === 0 ? '₹0'
        : (delta > 0 ? '+' : '') + fmt(delta)

      // Sugarcane API gives per quintal; convert to per tonne
      const adjustedPrice = commodity === 'Sugarcane' ? modal * 10 : modal

      mapped.push({
        crop: meta.name,
        unit: meta.unit,
        price: fmt(adjustedPrice),
        change: changeStr,
        trend,
        market: `APMC ${r.market || r.Market || meta.market.replace('APMC ', '')}`,
        img: meta.img,
        _raw: modal,
      })
    }

    if (!mapped.length) throw new Error('No matching crops found')

    // Save current as "previous" for next fetch
    const newPrevMap = {}
    mapped.forEach(p => { newPrevMap[p.crop] = p._raw })
    localStorage.setItem(prevKey, JSON.stringify(newPrevMap))

    // Merge with baseline (add any crops missing from API)
    const liveNames = new Set(mapped.map(p => p.crop))
    const fallbacks = BASELINE_PRICES.filter(p => !liveNames.has(p.crop))
    const final = [...mapped, ...fallbacks]

    // Cache the result
    localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data: final }))
    console.log(`[Prices] Live data fetched: ${mapped.length} crops from AGMARKNET`)
    return final

  } catch (err) {
    console.warn('[Prices] Live fetch failed, using baseline:', err.message)
    return null
  }
}

/** Clears the price cache (call this to force a fresh fetch) */
export function clearPriceCache() {
  localStorage.removeItem(CACHE_KEY)
}
