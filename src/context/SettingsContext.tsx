import React, { createContext, useContext, useEffect, useState } from 'react'

type ThemeMode = 'light' | 'dark' | 'system'

interface SettingsState {
  themeMode: ThemeMode
  network: string
  addressDisplay: string
  toastsEnabled: boolean
  autoDismiss: string
  setThemeMode: (m: ThemeMode) => void
  setNetwork: (n: string) => void
  setAddressDisplay: (s: string) => void
  setToastsEnabled: (b: boolean) => void
  setAutoDismiss: (s: string) => void
}

const STORAGE_KEY = 'credence:settings'

const defaultState: SettingsState = {
  themeMode: 'system',
  network: 'public',
  addressDisplay: 'short',
  toastsEnabled: true,
  autoDismiss: '5s',
  setThemeMode: () => {},
  setNetwork: () => {},
  setAddressDisplay: () => {},
  setToastsEnabled: () => {},
  setAutoDismiss: () => {},
}

const SettingsContext = createContext<SettingsState>(defaultState)

export function useSettings() {
  return useContext(SettingsContext)
}

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return 'system'
      const parsed = JSON.parse(raw)
      return (parsed.themeMode as ThemeMode) || 'system'
    } catch {
      return 'system'
    }
  })

  const [network, setNetwork] = useState<string>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return 'public'
      const parsed = JSON.parse(raw)
      return parsed.network || 'public'
    } catch {
      return 'public'
    }
  })

  const [addressDisplay, setAddressDisplay] = useState<string>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return 'short'
      const parsed = JSON.parse(raw)
      return parsed.addressDisplay || 'short'
    } catch {
      return 'short'
    }
  })

  const [toastsEnabled, setToastsEnabled] = useState<boolean>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return true
      const parsed = JSON.parse(raw)
      return typeof parsed.toastsEnabled === 'boolean' ? parsed.toastsEnabled : true
    } catch {
      return true
    }
  })

  const [autoDismiss, setAutoDismiss] = useState<string>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return '5s'
      const parsed = JSON.parse(raw)
      return parsed.autoDismiss || '5s'
    } catch {
      return '5s'
    }
  })

  // persist on changes
  useEffect(() => {
    try {
      const payload = { themeMode, network, addressDisplay, toastsEnabled, autoDismiss }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    } catch {
      // ignore
    }
  }, [themeMode, network, addressDisplay, toastsEnabled, autoDismiss])

  // apply theme to document
  useEffect(() => {
    if (typeof window === 'undefined') return
    const root = window.document.documentElement

    const apply = () => {
      if (themeMode === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        root.setAttribute('data-theme', isDark ? 'dark' : 'light')
      } else {
        root.setAttribute('data-theme', themeMode)
      }
    }

    apply()

    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => apply()
    mql.addEventListener?.('change', handler)
    return () => mql.removeEventListener?.('change', handler)
  }, [themeMode])

  const value: SettingsState = {
    themeMode,
    network,
    addressDisplay,
    toastsEnabled,
    autoDismiss,
    setThemeMode,
    setNetwork,
    setAddressDisplay,
    setToastsEnabled,
    setAutoDismiss,
  }

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}
