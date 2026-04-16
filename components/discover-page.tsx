'use client'

import { useEffect, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import { Search, SlidersHorizontal, X, Code2, Layers, Paintbrush, BarChart2, Shield, Server } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArticleCard } from '@/components/article-card'
import { ARTICLES, CATEGORIES } from '@/lib/data'
import { toCategorySlug } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { useI18n } from '@/components/i18n-provider'

const SORT_OPTIONS = [
  { value: 'trending', labelKey: 'discover.sortTrending' },
  { value: 'recent', labelKey: 'discover.sortRecent' },
  { value: 'views', labelKey: 'discover.sortViews' },
  { value: 'read-time', labelKey: 'discover.sortReadTime' },
]

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Code2, Layers, Paintbrush, BarChart2, Shield, Server,
}

export function DiscoverPage() {
  const { t } = useI18n()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [sort, setSort] = useState('trending')
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  useEffect(() => {
    const paramCategory = searchParams.get('category')
    const paramQuery = searchParams.get('q')
    const paramSort = searchParams.get('sort')

    const isKnownSort = SORT_OPTIONS.some((option) => option.value === paramSort)

    setSelectedCategory(paramCategory)
    setQuery(paramQuery ?? '')
    setSort(isKnownSort ? (paramSort as string) : 'trending')
  }, [searchParams])

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    ARTICLES.forEach((a) => a.tags.forEach((t) => tags.add(t)))
    return Array.from(tags).slice(0, 20)
  }, [])

  const filtered = useMemo(() => {
    let results = [...ARTICLES]

    if (query) {
      const q = query.toLowerCase()
      results = results.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    if (selectedCategory) {
      results = results.filter(
        (a) => toCategorySlug(a.category) === selectedCategory
      )
    }

    if (selectedTags.length > 0) {
      results = results.filter((a) =>
        selectedTags.every((t) => a.tags.includes(t))
      )
    }

    switch (sort) {
      case 'views':
        results.sort((a, b) => b.views - a.views)
        break
      case 'recent':
        results.sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        )
        break
      case 'read-time':
        results.sort((a, b) => a.readTime - b.readTime)
        break
      default:
        results.sort((a, b) => b.views - a.views)
    }

    return results
  }, [query, selectedCategory, sort, selectedTags])

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setQuery('')
    setSelectedCategory(null)
    setSelectedTags([])
  }

  const hasFilters = query || selectedCategory || selectedTags.length > 0

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-foreground tracking-tight mb-1">
          {t('discover.title')}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t('discover.summary', {
            articles: ARTICLES.length,
            categories: CATEGORIES.length,
          })}
        </p>
      </motion.div>

      {/* Search + sort bar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('discover.searchPlaceholder')}
            className="pl-9 h-9 text-sm"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="h-9 text-xs w-36 gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value} className="text-xs">
                {t(o.labelKey)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="h-9 text-xs gap-1.5"
            onClick={clearFilters}
          >
            <X className="w-3.5 h-3.5" />
            {t('discover.clear')}
          </Button>
        )}
      </div>

      {/* Category pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-hide">
        <button
          onClick={() => setSelectedCategory(null)}
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap border transition-all shrink-0',
            !selectedCategory
              ? 'bg-foreground text-background border-foreground font-medium'
              : 'border-border text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground hover:bg-accent'
          )}
        >
          {t('common.all')}
          <span className="opacity-60">{ARTICLES.length}</span>
        </button>
        {CATEGORIES.map((cat) => {
          const Icon = CATEGORY_ICONS[cat.icon] ?? Code2
          const active = selectedCategory === cat.slug
          return (
            <button
              key={cat.id}
              onClick={() =>
                setSelectedCategory(active ? null : cat.slug)
              }
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs whitespace-nowrap border transition-all shrink-0',
                active
                  ? 'bg-foreground text-background border-foreground font-medium'
                  : 'border-border text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground hover:bg-accent'
              )}
            >
              <Icon className="w-3 h-3" />
              {t(`categories.${cat.slug}`, undefined, cat.name)}
              <span className="opacity-60">{cat.count}</span>
            </button>
          )
        })}
      </div>

      {/* Tag filters */}
      <div className="flex flex-wrap gap-1.5 mb-8">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={cn(
              'px-2.5 py-1 rounded-full text-xs border transition-all',
              selectedTags.includes(tag)
                ? 'bg-foreground/10 border-foreground/30 text-foreground font-medium'
                : 'border-border text-muted-foreground hover:border-muted-foreground/40 hover:text-foreground hover:bg-accent'
            )}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-5">
        <p className="text-xs text-muted-foreground">
          {filtered.length === 1
            ? t('discover.resultsSingle', { count: filtered.length })
            : t('discover.resultsPlural', { count: filtered.length })}
        </p>
      </div>

      {/* Article grid */}
      <AnimatePresence mode="wait">
        {filtered.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-20 text-muted-foreground"
          >
            <Search className="w-10 h-10 mb-3 opacity-20" />
            <p className="text-sm font-medium">{t('discover.emptyTitle')}</p>
            <p className="text-xs mt-1">{t('discover.emptyDescription')}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 text-xs"
              onClick={clearFilters}
            >
              {t('discover.clearAllFilters')}
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
