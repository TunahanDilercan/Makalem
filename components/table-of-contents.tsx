'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useI18n } from '@/components/i18n-provider'

interface TocItem {
  id: string
  title: string
  level: number
}

function extractHeadings(content: string): TocItem[] {
  const lines = content.split('\n')
  const headings: TocItem[] = []
  for (const line of lines) {
    const m2 = line.match(/^## (.+)$/)
    const m3 = line.match(/^### (.+)$/)
    const m4 = line.match(/^#### (.+)$/)
    if (m2) {
      headings.push({
        id: m2[1].toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'),
        title: m2[1],
        level: 2,
      })
    } else if (m3) {
      headings.push({
        id: m3[1].toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'),
        title: m3[1],
        level: 3,
      })
    } else if (m4) {
      headings.push({
        id: m4[1].toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'),
        title: m4[1],
        level: 4,
      })
    }
  }
  return headings
}

interface TocProps {
  content: string
}

export function TableOfContents({ content }: TocProps) {
  const headings = extractHeadings(content)
  const [active, setActive] = useState<string>('')
  const { t } = useI18n()

  useEffect(() => {
    if (headings.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        }
      },
      { rootMargin: '0px 0px -70% 0px', threshold: 0 }
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <motion.nav
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      aria-label={t('toc.ariaLabel')}
    >
      <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">
        {t('toc.onThisPage')}
      </p>
      <ul className="space-y-0.5">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                'block text-sm leading-snug py-1 transition-colors',
                heading.level === 2 ? 'pl-0' : heading.level === 3 ? 'pl-3' : 'pl-5',
                active === heading.id
                  ? 'text-foreground font-medium'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              onClick={(e) => {
                e.preventDefault()
                const el = document.getElementById(heading.id)
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
            >
              {active === heading.id && (
                <span className="inline-block w-1 h-1 rounded-full bg-foreground mr-1.5 mb-0.5" />
              )}
              {heading.title}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  )
}
