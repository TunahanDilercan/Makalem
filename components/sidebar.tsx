'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Home,
  Compass,
  Settings,
  PenSquare,
  ChevronLeft,
  BookMarked,
  Hash,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { CATEGORIES } from '@/lib/data'
import { useI18n } from '@/components/i18n-provider'
import { LogoMark } from '@/components/logo-mark'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const NAV_ITEMS = [
  { href: '/', icon: Home, labelKey: 'common.home' },
  { href: '/discover', icon: Compass, labelKey: 'common.discover' },
  { href: '/library', icon: BookMarked, labelKey: 'common.library' },
  { href: '/editor', icon: PenSquare, labelKey: 'common.write' },
]

const BOTTOM_ITEMS = [
  { href: '/settings', icon: Settings, labelKey: 'common.settings' },
]

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const { t } = useI18n()

  return (
    <TooltipProvider delayDuration={0}>
      <motion.aside
        animate={{ width: collapsed ? 56 : 240 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="relative flex flex-col h-full bg-sidebar border-r border-sidebar-border overflow-hidden shrink-0"
      >
        {/* Logo */}
        <div className="flex items-center h-14 px-3 border-b border-sidebar-border">
          <Link href="/" className="flex items-center gap-2.5 min-w-0">
            <div
              className="w-7 h-7 rounded-md shrink-0 border border-sidebar-border bg-white dark:bg-black flex items-center justify-center"
              aria-label={t('project.logoAlt')}
            >
              <LogoMark className="w-5 h-5" />
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.18 }}
                  className="font-semibold text-sidebar-foreground text-[15px] tracking-tight whitespace-nowrap overflow-hidden"
                >
                  {t('project.name')}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 flex flex-col gap-0.5 p-2 pt-3 overflow-y-auto">
          {NAV_ITEMS.map(({ href, icon: Icon, labelKey }) => {
            const active =
              href === '/' ? pathname === '/' : pathname.startsWith(href)
            return (
              <NavItem
                key={href}
                href={href}
                icon={Icon}
                label={t(labelKey)}
                active={active}
                collapsed={collapsed}
              />
            )
          })}

          <div className="my-2 border-t border-sidebar-border" />

          {/* Categories quick links */}
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-2 pb-1"
            >
              <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider mb-2">
                {t('sidebar.categories')}
              </p>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/discover?category=${cat.slug}`}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
                >
                  <Hash className="w-3 h-3 shrink-0" />
                  <span className="truncate">
                    {t(`categories.${cat.slug}`, undefined, cat.name)}
                  </span>
                </Link>
              ))}
            </motion.div>
          )}
        </nav>

        {/* Bottom */}
        <div className="p-2 border-t border-sidebar-border flex flex-col gap-0.5">
          {BOTTOM_ITEMS.map(({ href, icon: Icon, labelKey }) => (
            <NavItem
              key={href}
              href={href}
              icon={Icon}
              label={t(labelKey)}
              active={pathname === href}
              collapsed={collapsed}
            />
          ))}

          {/* User avatar */}
          <div
            className={cn(
              'flex items-center gap-2 px-2 py-2 rounded-md mt-1',
              collapsed ? 'justify-center' : ''
            )}
          >
            <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground shrink-0">
              AC
            </div>
            {!collapsed && (
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  Alex Chen
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  alex@example.com
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={onToggle}
          className="absolute top-[58px] -right-3 z-10 flex items-center justify-center w-6 h-6 rounded-full bg-background border border-border shadow-sm hover:bg-accent transition-colors"
          aria-label={collapsed ? t('sidebar.expand') : t('sidebar.collapse')}
        >
          <motion.div
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <ChevronLeft className="w-3.5 h-3.5 text-muted-foreground" />
          </motion.div>
        </button>
      </motion.aside>
    </TooltipProvider>
  )
}

function NavItem({
  href,
  icon: Icon,
  label,
  active,
  collapsed,
}: {
  href: string
  icon: React.ElementType
  label: string
  active: boolean
  collapsed: boolean
}) {
  const content = (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-2.5 px-2 py-2 rounded-md text-sm transition-colors relative group',
        active
          ? 'bg-sidebar-accent text-sidebar-foreground font-medium'
          : 'text-muted-foreground hover:text-sidebar-foreground hover:bg-sidebar-accent',
        collapsed && 'justify-center'
      )}
    >
      {active && (
        <motion.div
          layoutId="sidebar-active"
          className="absolute inset-0 rounded-md bg-sidebar-accent"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
      <Icon
        className={cn(
          'w-4 h-4 shrink-0 relative z-10',
          active ? 'text-sidebar-foreground' : ''
        )}
      />
      {!collapsed && (
        <span className="relative z-10 whitespace-nowrap">{label}</span>
      )}
    </Link>
  )

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{content}</TooltipTrigger>
        <TooltipContent side="right" className="text-xs">
          {label}
        </TooltipContent>
      </Tooltip>
    )
  }

  return content
}
