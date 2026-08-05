import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle({ style = {} }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        width: 36, height: 36,
        borderRadius: '50%',
        border: isDark ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,0,0,0.15)',
        cursor: 'pointer',
        background: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.8)',
        color: isDark ? '#f8fafc' : '#334155',
        transition: 'all 0.3s ease',
        boxShadow: isDark ? 'inset 0 2px 4px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.05)',
        flexShrink: 0,
        ...style,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.1)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)'
      }}
    >
      {isDark ? (
        <Moon size={18} color="#f1f5f9" />
      ) : (
        <Sun size={18} color="#f59e0b" />
      )}
    </button>
  )
}


