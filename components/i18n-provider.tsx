'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import {
  DATE_LOCALE_BY_LOCALE,
  DEFAULT_LOCALE,
  getMessages,
  LOCALE_COOKIE_NAME,
  type Locale,
  type TranslateValues,
  translate,
} from '@/lib/i18n'

interface I18nContextValue {
  locale: Locale
  dateLocale: string
  setLocale: (locale: Locale) => void
  t: (key: string, values?: TranslateValues, fallback?: string) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

interface I18nProviderProps {
  initialLocale?: Locale
  children: React.ReactNode
}

export function I18nProvider({
  initialLocale = DEFAULT_LOCALE,
  children,
}: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(LOCALE_COOKIE_NAME)
      if (stored === 'en' || stored === 'tr') {
        setLocaleState(stored)
      }
    } catch {
      // Ignore localStorage read errors in restrictive browser environments.
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
    document.cookie = `${LOCALE_COOKIE_NAME}=${locale}; path=/; max-age=31536000; samesite=lax`

    try {
      window.localStorage.setItem(LOCALE_COOKIE_NAME, locale)
    } catch {
      // Ignore localStorage write errors in restrictive browser environments.
    }
  }, [locale])

  const messages = useMemo(() => getMessages(locale), [locale])

  const t = useCallback(
    (key: string, values?: TranslateValues, fallback?: string) =>
      translate(messages, key, values, fallback),
    [messages]
  )

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      dateLocale: DATE_LOCALE_BY_LOCALE[locale],
      setLocale: setLocaleState,
      t,
    }),
    [locale, t]
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider')
  }
  return context
}
