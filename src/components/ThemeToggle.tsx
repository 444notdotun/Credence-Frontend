import { useEffect, useState } from 'react'
import { useSettings } from '../context/SettingsContext'

export default function ThemeToggle() {
  const { themeMode, setThemeMode } = useSettings()
  const [resolved, setResolved] = useState<'light' | 'dark'>(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  )

  useEffect(() => {
    if (themeMode === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      setResolved(isDark ? 'dark' : 'light')
    } else {
      setResolved(themeMode)
    }
  }, [themeMode])

  const toggleTheme = () => {
    // if system, switch to explicit opposite of resolved
    if (themeMode === 'system') {
      setThemeMode(resolved === 'light' ? 'dark' : 'light')
    } else {
      setThemeMode(themeMode === 'light' ? 'dark' : 'light')
    }
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      style={{
        padding: '0.5rem',
        borderRadius: '8px',
        border: '1px solid var(--border-default)',
        background: 'var(--bg-card)',
        color: 'var(--text-primary)',
        cursor: 'pointer',
        fontSize: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        transition:
          'all var(--credence-motion-duration-base) var(--credence-motion-easing-standard)',
      }}
      title={`Switch to ${resolved === 'light' ? 'dark' : 'light'} mode`}
    >
      {resolved === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
