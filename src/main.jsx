import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { LanguageProvider } from './context/LanguageContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import './index.css'

// ── Migrate stale localStorage district spellings ──────────────────────────
const DISTRICT_ALIASES = {
  'Tumakuru': 'Tumkuru', 'Tumkur': 'Tumkuru',
  'Mysore': 'Mysuru', 'Shimoga': 'Shivamogga',
  'Bellary': 'Ballari', 'Belgaum': 'Belagavi',
  'Gulbarga': 'Kalaburagi', 'Bijapur': 'Vijayapura',
  'Davangere': 'Davanagere', 'Dharwar': 'Dharwad',
}
const storedDist = window.localStorage.getItem('citizen_district')
if (storedDist && DISTRICT_ALIASES[storedDist]) {
  window.localStorage.setItem('citizen_district', DISTRICT_ALIASES[storedDist])
}

// ── Global Error Boundary ──────────────────────────────────────────────────
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }
  componentDidCatch(error, info) {
    console.error('GramSetu App Error:', error, info)
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          background: '#0f172a', color: '#fff', padding: 24, textAlign: 'center',
          fontFamily: "'Inter', sans-serif"
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Something went wrong</h2>
          <p style={{ color: '#94a3b8', marginBottom: 24, maxWidth: 400 }}>
            The app encountered an error. Please try logging in again.
          </p>
          <button
            onClick={() => {
              window.localStorage.clear()
              window.location.href = '/'
            }}
            style={{
              background: '#16a34a', color: '#fff', border: 'none',
              borderRadius: 10, padding: '12px 24px', fontSize: 15,
              fontWeight: 700, cursor: 'pointer'
            }}
          >
            Go to Home Page
          </button>
          {this.state.error && (
            <details style={{ marginTop: 24, color: '#64748b', fontSize: 11, maxWidth: 500 }}>
              <summary style={{ cursor: 'pointer' }}>Error Details</summary>
              <pre style={{ textAlign: 'left', marginTop: 8 }}>{this.state.error.toString()}</pre>
            </details>
          )}
        </div>
      )
    }
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <LanguageProvider>
            <App />
          </LanguageProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>,
)
