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
        width: 38, height: 38,
        borderRadius: 10,
        border: 'none',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: isDark
          ? 'rgba(255,255,255,0.1)'
          : 'rgba(0,0,0,0.06)',
        transition: 'all 0.2s ease',
        flexShrink: 0,
        color: isDark ? '#fbbf24' : '#6366f1',
        ...style,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = isDark
          ? 'rgba(255,255,255,0.18)'
          : 'rgba(0,0,0,0.12)'
        e.currentTarget.style.transform = 'scale(1.1) rotate(15deg)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = isDark
          ? 'rgba(255,255,255,0.1)'
          : 'rgba(0,0,0,0.06)'
        e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
      }}
    >
      {isDark
        ? <Sun size={18} strokeWidth={2} />
        : <Moon size={18} strokeWidth={2} />
      }
    </button>
  )
}
