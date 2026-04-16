import en from '@/messages/en.json'
import tr from '@/messages/tr.json'

export const LOCALE_COOKIE_NAME = 'makalem-locale'

export const MESSAGES = {
  en,
  tr,
} as const

export type Locale = keyof typeof MESSAGES

export type TranslateValues = Record<string, string | number>

type MessageNode = string | { [key: string]: MessageNode }

type Messages = Record<string, MessageNode>

export const DEFAULT_LOCALE: Locale = 'tr'

export const DATE_LOCALE_BY_LOCALE: Record<Locale, string> = {
  en: 'en-US',
  tr: 'tr-TR',
}

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && value in MESSAGES
}

export function getMessages(locale: Locale): Messages {
  return MESSAGES[locale] as Messages
}

function getValueByPath(messages: Messages, key: string): string | undefined {
  const value = key.split('.').reduce<MessageNode | undefined>((acc, segment) => {
    if (!acc || typeof acc === 'string') {
      return undefined
    }
    return acc[segment]
  }, messages)

  return typeof value === 'string' ? value : undefined
}

function interpolate(template: string, values?: TranslateValues): string {
  if (!values) return template

  return template.replace(/\{(\w+)\}/g, (_, token: string) => {
    const replacement = values[token]
    return replacement === undefined ? `{${token}}` : String(replacement)
  })
}

export function translate(
  messages: Messages,
  key: string,
  values?: TranslateValues,
  fallback?: string
): string {
  const resolved = getValueByPath(messages, key)
  if (!resolved) return fallback ?? key
  return interpolate(resolved, values)
}

export function toCategorySlug(value: string): string {
  return value.toLowerCase().trim().replace(/\s+/g, '-')
}
