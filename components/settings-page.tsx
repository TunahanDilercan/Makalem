'use client'

import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { useI18n } from '@/components/i18n-provider'
import { isFirebaseConfigured } from '@/lib/firebase-client'

export function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const { locale, setLocale, t } = useI18n()
  const firebaseReady = isFirebaseConfigured()

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <h1 className="text-2xl font-bold tracking-tight text-foreground mb-1">
          {t('settings.title')}
        </h1>
        <p className="text-sm text-muted-foreground">{t('settings.subtitle')}</p>
      </motion.div>

      <section className="rounded-xl border border-border bg-card p-5 space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-foreground">{t('settings.languageTitle')}</h2>
          <p className="text-xs text-muted-foreground mt-1">{t('settings.languageDescription')}</p>
        </div>
        <Select value={locale} onValueChange={(value) => setLocale(value as 'tr' | 'en')}>
          <SelectTrigger className="h-9 w-44 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tr">Turkce</SelectItem>
            <SelectItem value="en">English</SelectItem>
          </SelectContent>
        </Select>
      </section>

      <section className="rounded-xl border border-border bg-card p-5 space-y-4">
        <div>
          <h2 className="text-sm font-semibold text-foreground">{t('settings.themeTitle')}</h2>
          <p className="text-xs text-muted-foreground mt-1">{t('settings.themeDescription')}</p>
        </div>
        <Select value={theme ?? 'system'} onValueChange={setTheme}>
          <SelectTrigger className="h-9 w-44 text-sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">{t('settings.themeLight')}</SelectItem>
            <SelectItem value="dark">{t('settings.themeDark')}</SelectItem>
            <SelectItem value="system">{t('settings.themeSystem')}</SelectItem>
          </SelectContent>
        </Select>
      </section>

      <section className="rounded-xl border border-border bg-card p-5 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-semibold text-foreground">{t('settings.firebaseTitle')}</h2>
          <Badge variant={firebaseReady ? 'default' : 'secondary'}>
            {firebaseReady ? t('settings.firebaseReady') : t('settings.firebaseNotReady')}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">{t('settings.firebaseDescription')}</p>
        <p className="text-xs text-muted-foreground">{t('settings.firebaseOptionalDemo')}</p>
        <Separator />
        <ul className="space-y-1 text-xs text-muted-foreground">
          <li>NEXT_PUBLIC_FIREBASE_API_KEY</li>
          <li>NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN</li>
          <li>NEXT_PUBLIC_FIREBASE_PROJECT_ID</li>
          <li>NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET</li>
          <li>NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID</li>
          <li>NEXT_PUBLIC_FIREBASE_APP_ID</li>
        </ul>
      </section>

      <section className="rounded-xl border border-border bg-card p-5 space-y-3">
        <h2 className="text-sm font-semibold text-foreground">{t('settings.sparkTitle')}</h2>
        <p className="text-xs text-muted-foreground">{t('settings.sparkDescription')}</p>
        <p className="text-xs text-muted-foreground">{t('settings.sparkQuota')}</p>
      </section>
    </div>
  )
}
