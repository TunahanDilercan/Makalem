'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Compass, BookMarked, PenSquare, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useI18n } from '@/components/i18n-provider'

const MOBILE_NAV_ITEMS = [
  { href: '/', icon: Home, labelKey: 'common.home' },
  { href: '/discover', icon: Compass, labelKey: 'common.discover' },
  { href: '/library', icon: BookMarked, labelKey: 'common.library' },
  { href: '/editor', icon: PenSquare, labelKey: 'common.write' },
  { href: '/settings', icon: Settings, labelKey: 'common.settings' },
]

export function MobileNav() {
  const pathname = usePathname()
  const { t } = useI18n()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <ul className="grid grid-cols-5 h-14">
        {MOBILE_NAV_ITEMS.map(({ href, icon: Icon, labelKey }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'h-full flex flex-col items-center justify-center gap-1 text-[10px] transition-colors',
                  active
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{t(labelKey)}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
