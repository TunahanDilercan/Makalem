import { notFound } from 'next/navigation'
import { AppShell } from '@/components/app-shell'
import { ArticleView } from '@/components/article-view'
import { ARTICLES, getArticleBySlug, getRelatedArticles } from '@/lib/data'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return { title: 'Bulunamadı' }
  return {
    title: article.title,
    description: article.excerpt,
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)

  if (!article) notFound()

  const related = getRelatedArticles(article)

  return (
    <AppShell>
      <ArticleView article={article} related={related} />
    </AppShell>
  )
}
