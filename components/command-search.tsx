'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { FileText, Hash, Compass, PenSquare, Home } from 'lucide-react'
import { ARTICLES, CATEGORIES } from '@/lib/data'
import { useI18n } from '@/components/i18n-provider'

interface CommandSearchProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandSearch({ open, onOpenChange }: CommandSearchProps) {
  const router = useRouter()
  const { t } = useI18n()

  // ⌘K shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [open, onOpenChange])

  const navigate = (href: string) => {
    onOpenChange(false)
    router.push(href)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder={t('command.placeholder')} />
      <CommandList>
        <CommandEmpty>{t('command.noResults')}</CommandEmpty>

        <CommandGroup heading={t('command.pages')}>
          <CommandItem onSelect={() => navigate('/')}>
            <Home className="mr-2 h-4 w-4" />
            {t('common.home')}
          </CommandItem>
          <CommandItem onSelect={() => navigate('/discover')}>
            <Compass className="mr-2 h-4 w-4" />
            {t('common.discover')}
          </CommandItem>
          <CommandItem onSelect={() => navigate('/editor')}>
            <PenSquare className="mr-2 h-4 w-4" />
            {t('command.writeArticle')}
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading={t('command.articles')}>
          {ARTICLES.map((article) => (
            <CommandItem
              key={article.id}
              onSelect={() => navigate(`/article/${article.slug}`)}
            >
              <FileText className="mr-2 h-4 w-4 shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="truncate">{article.title}</span>
                <span className="text-xs text-muted-foreground">
                  {article.category}
                </span>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading={t('command.categories')}>
          {CATEGORIES.map((cat) => (
            <CommandItem
              key={cat.id}
              onSelect={() =>
                navigate(`/discover?category=${cat.slug}`)
              }
            >
              <Hash className="mr-2 h-4 w-4" />
              {t(`categories.${cat.slug}`, undefined, cat.name)}
              <span className="ml-auto text-xs text-muted-foreground">
                {t('command.categoryArticleCount', { count: cat.count })}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
