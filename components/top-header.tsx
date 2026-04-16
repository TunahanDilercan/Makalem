'use client'

import { useState } from 'react'
import { Search, Sun, Moon, Bell, PenSquare, Languages } from 'lucide-react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { AuthModal } from '@/components/auth-modal'
import { CommandSearch } from '@/components/command-search'
import { useI18n } from '@/components/i18n-provider'
import Link from 'next/link'

export function TopHeader() {
  const { theme, setTheme } = useTheme()
  const { locale, setLocale, t } = useI18n()
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-40 h-14 glass border-b border-border flex items-center px-3 sm:px-4 gap-2 sm:gap-3">
        {/* Search trigger */}
        <button
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 flex-1 min-w-0 max-w-sm px-3 py-1.5 rounded-md border border-border bg-muted/50 text-muted-foreground text-sm hover:bg-accent hover:text-foreground transition-colors"
        >
          <Search className="w-3.5 h-3.5 shrink-0" />
          <span className="flex-1 text-left truncate">{t('header.searchPlaceholder')}</span>
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
            ⌘K
          </kbd>
        </button>

        <div className="flex items-center gap-1 ml-auto shrink-0">
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-2 gap-1 text-[10px] font-semibold"
            onClick={() => setLocale(locale === 'tr' ? 'en' : 'tr')}
            aria-label={t('header.changeLanguage')}
            title={t('header.changeLanguage')}
          >
            <Languages className="w-3.5 h-3.5" />
            {locale.toUpperCase()}
          </Button>

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={t('header.toggleTheme')}
          >
            <Sun className="w-4 h-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute w-4 h-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <Button variant="ghost" size="icon" className="hidden sm:inline-flex w-8 h-8" aria-label={t('header.notifications')}>
            <Bell className="w-4 h-4" />
          </Button>

          <div className="hidden sm:block w-px h-5 bg-border mx-1" />

          <Link href="/editor">
            <Button size="sm" className="hidden sm:inline-flex gap-1.5 h-8 text-xs font-medium">
              <PenSquare className="w-3.5 h-3.5" />
              {t('common.write')}
            </Button>
          </Link>

          <AuthModal />
        </div>
      </header>

      <CommandSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
