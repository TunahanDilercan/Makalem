'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  Share2,
  Bookmark,
  ThumbsUp,
  ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { TableOfContents } from '@/components/table-of-contents'
import { ArticleCard } from '@/components/article-card'
import { MarkdownRenderer } from '@/components/markdown-renderer'
import type { Article } from '@/lib/data'
import { toCategorySlug } from '@/lib/i18n'
import { useI18n } from '@/components/i18n-provider'

interface ArticleViewProps {
  article: Article
  related: Article[]
}

export function ArticleView({ article, related }: ArticleViewProps) {
  const { t, dateLocale } = useI18n()

  return (
    <div className="min-h-full">
      {/* Article header */}
      <div className="border-b border-border px-6 py-5 glass sticky top-0 z-30">
        <div className="flex items-center gap-3 max-w-6xl mx-auto">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-1.5 h-8 text-xs text-muted-foreground">
              <ArrowLeft className="w-3.5 h-3.5" />
              {t('article.back')}
            </Button>
          </Link>
          <div className="h-4 w-px bg-border" />
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground overflow-hidden">
            <Link href="/" className="hover:text-foreground transition-colors truncate">
              {t('common.home')}
            </Link>
            <span>/</span>
            <Link
              href={`/discover?category=${toCategorySlug(article.category)}`}
              className="hover:text-foreground transition-colors truncate"
            >
              {t(
                `categories.${toCategorySlug(article.category)}`,
                undefined,
                article.category
              )}
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium truncate">{article.title}</span>
          </nav>
          <div className="ml-auto flex items-center gap-1.5">
            <Button variant="ghost" size="icon" className="w-8 h-8" aria-label={t('article.bookmarkAria')}>
              <Bookmark className="w-3.5 h-3.5" />
            </Button>
            <Button variant="ghost" size="icon" className="w-8 h-8" aria-label={t('article.shareAria')}>
              <Share2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex gap-10">
          {/* Left TOC — sticky */}
          <aside className="hidden lg:block w-52 shrink-0">
            <div className="sticky top-[104px]">
              <TableOfContents content={article.content} />
            </div>
          </aside>

          {/* Main content */}
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1 min-w-0 max-w-2xl"
          >
            {/* Article meta */}
            <div className="mb-8">
              <Badge variant="secondary" className="mb-4 text-xs">
                {t(
                  `categories.${toCategorySlug(article.category)}`,
                  undefined,
                  article.category
                )}
              </Badge>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight mb-4 text-balance">
                {article.title}
              </h1>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                {article.excerpt}
              </p>

              {/* Author & meta row */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground">
                    {article.author.initials}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground leading-none">
                      {article.author.name}
                    </p>
                  </div>
                </div>
                <div className="h-4 w-px bg-border hidden sm:block" />
                <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(article.publishedAt).toLocaleDateString(dateLocale, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {t('article.minRead', { count: article.readTime })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {t('common.views', {
                      count:
                        article.views >= 1000
                          ? `${(article.views / 1000).toFixed(1)}k`
                          : article.views,
                    })}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/discover?q=${tag}`}
                    className="px-2.5 py-1 rounded-full text-xs border border-border text-muted-foreground hover:bg-accent hover:border-muted-foreground/40 hover:text-foreground transition-all"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            <Separator className="mb-8" />

            {/* Article body */}
            <MarkdownRenderer content={article.content} />

            <Separator className="my-10" />

            {/* Reaction row */}
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2 h-9">
                <ThumbsUp className="w-3.5 h-3.5" />
                {t('article.helpful')}
              </Button>
              <Button variant="outline" size="sm" className="gap-2 h-9">
                <Bookmark className="w-3.5 h-3.5" />
                {t('article.save')}
              </Button>
              <Button variant="outline" size="sm" className="gap-2 h-9">
                <Share2 className="w-3.5 h-3.5" />
                {t('article.share')}
              </Button>
            </div>
          </motion.article>

          {/* Right sidebar */}
          {related.length > 0 && (
            <aside className="hidden xl:block w-60 shrink-0">
              <div className="sticky top-[104px] space-y-6">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
                    {t('article.related')}
                  </p>
                  <ul className="space-y-2">
                    {related.map((rel) => (
                      <li key={rel.id}>
                        <Link
                          href={`/article/${rel.slug}`}
                          className="group block p-3 rounded-lg border border-border hover:border-muted-foreground/30 hover:bg-accent transition-all"
                        >
                          <p className="text-xs font-medium text-foreground line-clamp-2 leading-snug mb-1 group-hover:text-foreground transition-colors">
                            {rel.title}
                          </p>
                          <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {t('common.minutesRead', { count: rel.readTime })}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                    {t('article.lastUpdated')}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(article.updatedAt).toLocaleDateString(dateLocale, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </aside>
          )}
        </div>

        {/* Related cards at bottom (mobile) */}
        {related.length > 0 && (
          <div className="xl:hidden mt-14">
            <h3 className="text-sm font-semibold text-foreground mb-4">
              {t('article.related')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((rel, i) => (
                <ArticleCard key={rel.id} article={rel} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
