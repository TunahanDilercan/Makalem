'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Clock, Eye, ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Article } from '@/lib/data'
import { toCategorySlug } from '@/lib/i18n'
import { useI18n } from '@/components/i18n-provider'

interface ArticleCardProps {
  article: Article
  featured?: boolean
  className?: string
  index?: number
}

export function ArticleCard({
  article,
  featured = false,
  className,
  index = 0,
}: ArticleCardProps) {
  const { t } = useI18n()

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
    >
      <Link href={`/article/${article.slug}`} className="group block h-full">
        <div
          className={cn(
            'relative h-full rounded-xl border border-border bg-card p-5 transition-all duration-200',
            'hover:border-muted-foreground/30 hover:shadow-lg hover:shadow-black/5',
            'dark:hover:shadow-black/20',
            featured && 'p-6',
            className
          )}
        >
          {/* Category badge */}
          <div className="flex items-center justify-between mb-3">
            <Badge
              variant="secondary"
              className="text-[11px] font-medium px-2 py-0.5"
            >
              {t(
                `categories.${toCategorySlug(article.category)}`,
                undefined,
                article.category
              )}
            </Badge>
            <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity -translate-y-0.5 translate-x-0.5 group-hover:translate-y-0 group-hover:translate-x-0 duration-150" />
          </div>

          {/* Title */}
          <h3
            className={cn(
              'font-semibold text-foreground leading-snug tracking-tight mb-2 group-hover:text-foreground transition-colors',
              featured ? 'text-lg' : 'text-base'
            )}
          >
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
            {article.excerpt}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[9px] font-semibold text-muted-foreground">
                {article.author.initials}
              </div>
              <span className="text-xs text-muted-foreground">
                {article.author.name}
              </span>
            </div>
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
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
