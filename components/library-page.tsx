'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Bookmark,
  Clock,
  FileText,
  TrendingUp,
  Calendar,
  Eye,
  BookOpen,
  Trash2,
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArticleCard } from '@/components/article-card'
import { ARTICLES } from '@/lib/data'
import { cn } from '@/lib/utils'
import { toCategorySlug } from '@/lib/i18n'
import { useI18n } from '@/components/i18n-provider'

// Simulate saved/history state
const SAVED_IDS = ['1', '3', '5']
const HISTORY_IDS = ['2', '4', '6', '1']

const READING_STATS = [
  { labelKey: 'library.statRead', value: '24', icon: BookOpen },
  { labelKey: 'library.statWeek', value: '6', icon: TrendingUp },
  { labelKey: 'library.statAvgRead', value: '7m', icon: Clock },
  { labelKey: 'library.statSaved', value: '3', icon: Bookmark },
]

export function LibraryPage() {
  const [savedIds, setSavedIds] = useState(SAVED_IDS)
  const { t, dateLocale } = useI18n()

  const savedArticles = ARTICLES.filter((a) => savedIds.includes(a.id))
  const historyArticles = ARTICLES.filter((a) => HISTORY_IDS.includes(a.id))

  const unsave = (id: string) => setSavedIds((prev) => prev.filter((i) => i !== id))

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-foreground tracking-tight mb-1">
          {t('library.title')}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t('library.subtitle')}
        </p>
      </motion.div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {READING_STATS.map((stat, i) => (
          <motion.div
            key={stat.labelKey}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card"
          >
            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
              <stat.icon className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground leading-none">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{t(stat.labelKey)}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="saved">
        <TabsList className="mb-6">
          <TabsTrigger value="saved" className="gap-1.5 text-xs">
            <Bookmark className="w-3.5 h-3.5" />
            {t('library.saved')}
            {savedArticles.length > 0 && (
              <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                {savedArticles.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-1.5 text-xs">
            <Clock className="w-3.5 h-3.5" />
            {t('library.history')}
          </TabsTrigger>
          <TabsTrigger value="authored" className="gap-1.5 text-xs">
            <FileText className="w-3.5 h-3.5" />
            {t('library.myArticles')}
          </TabsTrigger>
        </TabsList>

        {/* Saved */}
        <TabsContent value="saved" className="mt-0">
          {savedArticles.length === 0 ? (
            <EmptyState
              icon={<Bookmark className="w-10 h-10 opacity-20" />}
              title={t('library.noSavedTitle')}
              description={t('library.noSavedDescription')}
            />
          ) : (
            <div className="space-y-3">
              {savedArticles.map((article, i) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="group flex items-start gap-4 p-4 rounded-xl border border-border bg-card hover:border-muted-foreground/30 transition-all"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <Badge variant="secondary" className="text-[10px]">
                        {t(
                          `categories.${toCategorySlug(article.category)}`,
                          undefined,
                          article.category
                        )}
                      </Badge>
                    </div>
                    <Link href={`/article/${article.slug}`}>
                      <h3 className="text-sm font-semibold text-foreground hover:text-foreground/80 transition-colors leading-snug mb-1">
                        {article.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}m
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {article.views >= 1000
                          ? `${(article.views / 1000).toFixed(1)}k`
                          : article.views}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.publishedAt).toLocaleDateString(dateLocale, {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => unsave(article.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md hover:bg-destructive/10 hover:text-destructive text-muted-foreground"
                    aria-label={t('library.removeFromLibrary')}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* History */}
        <TabsContent value="history" className="mt-0">
          <div className="space-y-6">
            {[
              { date: t('library.today'), articles: historyArticles.slice(0, 2) },
              { date: t('library.yesterday'), articles: historyArticles.slice(2, 4) },
            ].map((group) => (
              <div key={group.date}>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  {group.date}
                </p>
                <div className="space-y-2">
                  {group.articles.map((article, i) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={`/article/${article.slug}`}
                        className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent transition-colors group"
                      >
                        <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center shrink-0">
                          <BookOpen className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate group-hover:text-foreground transition-colors">
                            {article.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t(
                              `categories.${toCategorySlug(article.category)}`,
                              undefined,
                              article.category
                            )}{' '}
                            · {article.readTime}m {t('library.readSuffix')}
                          </p>
                        </div>
                        <Badge variant="secondary" className="text-[10px] shrink-0">
                          {t(
                            `categories.${toCategorySlug(article.category)}`,
                            undefined,
                            article.category
                          )}
                        </Badge>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* My Articles */}
        <TabsContent value="authored" className="mt-0">
          <EmptyState
            icon={<FileText className="w-10 h-10 opacity-20" />}
            title={t('library.noArticlesTitle')}
            description={t('library.noArticlesDescription')}
            action={
              <Link href="/editor">
                <Button size="sm" className="mt-4 gap-1.5 text-xs">
                  {t('library.writeFirst')}
                </Button>
              </Link>
            }
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode
  title: string
  description: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
      {icon}
      <p className="text-sm font-medium text-foreground mt-3">{title}</p>
      <p className="text-xs mt-1 max-w-xs">{description}</p>
      {action}
    </div>
  )
}
