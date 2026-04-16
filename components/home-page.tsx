'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Search,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Code2,
  Layers,
  Paintbrush,
  BarChart2,
  Shield,
  Server,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArticleCard } from '@/components/article-card'
import {
  ARTICLES,
  CATEGORIES,
  getFeaturedArticles,
  getTrendingArticles,
} from '@/lib/data'
import { CommandSearch } from '@/components/command-search'
import { cn } from '@/lib/utils'
import { toCategorySlug } from '@/lib/i18n'
import { useI18n } from '@/components/i18n-provider'

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  Code2,
  Layers,
  Paintbrush,
  BarChart2,
  Shield,
  Server,
}

const QUICK_LINKS = [
  { label: 'Bioinformatics', href: '/discover?category=bioinformatics' },
  { label: 'CRISPR', href: '/discover?q=CRISPR' },
  { label: 'Genomics', href: '/discover?category=genomics' },
  { label: 'scRNA-seq', href: '/discover?q=scRNA-seq' },
  { label: 'Biyoistatistik', href: '/discover?category=biostatistics' },
  { label: 'Yapay Zeka', href: '/discover?category=artificial-intelligence' },
]

export function HomePage() {
  const router = useRouter()
  const [searchOpen, setSearchOpen] = useState(false)
  const [heroQuery, setHeroQuery] = useState('')
  const { t } = useI18n()
  const featured = getFeaturedArticles()
  const trending = getTrendingArticles()
  const statItems = useMemo(() => {
    const totalViews = ARTICLES.reduce((sum, article) => sum + article.views, 0)
    const uniqueAuthors = new Set(ARTICLES.map((article) => article.author.name)).size
    const monthlyReaders = Math.max(1200, Math.round(totalViews / 40))
    const compact = (value: number) =>
      value >= 1000 ? `${(value / 1000).toFixed(1)}k` : `${value}`

    return [
      { labelKey: 'home.statsArticles', value: `${ARTICLES.length}` },
      { labelKey: 'home.statsCategories', value: `${CATEGORIES.length}` },
      { labelKey: 'home.statsAuthors', value: `${uniqueAuthors}` },
      { labelKey: 'home.statsReaders', value: compact(monthlyReaders) },
    ]
  }, [])

  const submitHeroSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const q = heroQuery.trim()
    router.push(q ? `/discover?q=${encodeURIComponent(q)}` : '/discover')
  }

  return (
    <>
      <CommandSearch open={searchOpen} onOpenChange={setSearchOpen} />

      {/* Hero */}
      <section className="relative px-6 pt-16 pb-14 border-b border-border overflow-hidden">
        {/* subtle grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="secondary"
              className="mb-5 gap-1.5 px-3 py-1 text-xs"
            >
              <Sparkles className="w-3 h-3" />
              {t('home.heroBadge')}
            </Badge>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4 text-balance">
              {t('home.heroTitleLine1')}
              <br />
              <span className="text-muted-foreground">{t('home.heroTitleLine2')}</span>
            </h1>

            <p className="text-base text-muted-foreground leading-relaxed mb-8 text-pretty max-w-lg mx-auto">
              {t('home.heroDescription')}
            </p>

            {/* Search button */}
            <form
              onSubmit={submitHeroSearch}
              className="flex items-center gap-3 w-full max-w-md mx-auto px-4 py-3 rounded-xl border border-border bg-card hover:border-muted-foreground/50 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 transition-all text-left group"
            >
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                value={heroQuery}
                onChange={(event) => setHeroQuery(event.target.value)}
                placeholder={t('home.searchAnything')}
                className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
              />
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  className="inline-flex items-center rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Open command search"
                >
                  ⌘K
                </button>
              </div>
            </form>

            {/* Quick tags */}
            <div className="flex flex-wrap justify-center gap-2 mt-5">
              {QUICK_LINKS.map((topic) => (
                  <Link
                    key={topic.label}
                    href={topic.href}
                    className="px-3 py-1 rounded-full text-xs border border-border text-muted-foreground hover:bg-accent hover:text-foreground hover:border-muted-foreground/40 transition-all"
                  >
                    {topic.label}
                  </Link>
                ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-border px-6 py-4">
        <div className="flex items-center justify-center gap-8 sm:gap-12 flex-wrap">
          {statItems.map((stat, i) => (
            <motion.div
              key={stat.labelKey}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="flex flex-col items-center"
            >
              <span className="text-xl font-bold text-foreground tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground">{t(stat.labelKey)}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-14">
        {/* Featured Articles */}
        <section>
          <SectionHeader
            icon={<Sparkles className="w-4 h-4" />}
            title={t('home.featured')}
            href="/discover"
            linkLabel={t('home.browseAll')}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
            {featured.map((article, i) => (
              <ArticleCard key={article.id} article={article} featured index={i} />
            ))}
          </div>
        </section>

        {/* Categories */}
        <section>
          <SectionHeader
            icon={<Layers className="w-4 h-4" />}
            title={t('home.browseByCategory')}
            href="/discover"
            linkLabel={t('home.allCategories')}
          />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-5">
            {CATEGORIES.map((cat, i) => {
              const Icon = CATEGORY_ICONS[cat.icon] ?? Code2
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={`/discover?category=${cat.slug}`}
                    className="group flex flex-col items-center gap-2.5 p-4 rounded-xl border border-border bg-card hover:border-muted-foreground/30 hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20 transition-all text-center"
                  >
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-100/80 dark:bg-zinc-800/40">
                      <Icon className="w-4.5 h-4.5 text-zinc-700 dark:text-zinc-200" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground leading-tight">
                        {t(`categories.${cat.slug}`, undefined, cat.name)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {t('common.articleCount', { count: cat.count })}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Trending + Recent split */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trending */}
          <div className="lg:col-span-1">
            <SectionHeader
              icon={<TrendingUp className="w-4 h-4" />}
              title={t('home.trending')}
              href="/discover?sort=trending"
              linkLabel={t('home.seeAll')}
            />
            <ul className="mt-4 space-y-1">
              {trending.map((article, i) => (
                <motion.li
                  key={article.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={`/article/${article.slug}`}
                    className="group flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-accent transition-colors"
                  >
                    <span className="mt-0.5 text-[11px] font-bold text-muted-foreground/50 w-4 shrink-0 tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground line-clamp-2 leading-snug group-hover:text-foreground transition-colors">
                        {article.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {t(
                          `categories.${toCategorySlug(article.category)}`,
                          undefined,
                          article.category
                        )}{' '}
                        ·{' '}
                        {t('home.viewsLabel', {
                          count:
                            article.views >= 1000
                              ? `${(article.views / 1000).toFixed(1)}k`
                              : article.views,
                        })}
                      </p>
                    </div>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Recent */}
          <div className="lg:col-span-2">
            <SectionHeader
              icon={<Code2 className="w-4 h-4" />}
              title={t('home.recentArticles')}
              href="/discover?sort=recent"
              linkLabel={t('home.seeAll')}
            />
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ARTICLES.slice(0, 4).map((article, i) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA banner */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 sm:p-10 text-center"
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04] dark:opacity-[0.08]"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 50% 0%, var(--ring) 0%, transparent 70%)',
              }}
            />
            <h2 className="text-2xl font-bold tracking-tight text-foreground mb-2">
              {t('home.ctaTitle')}
            </h2>
            <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
              {t('home.ctaDescription')}
            </p>
            <Link href="/editor">
              <Button size="default" className="gap-2">
                {t('home.startWriting')}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </section>
      </div>
    </>
  )
}

function SectionHeader({
  icon,
  title,
  href,
  linkLabel,
}: {
  icon: React.ReactNode
  title: string
  href: string
  linkLabel: string
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">{icon}</span>
        <h2 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          {title}
        </h2>
      </div>
      <Link
        href={href}
        className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors group"
      >
        {linkLabel}
        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
      </Link>
    </div>
  )
}
