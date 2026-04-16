import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { getFirebaseDb, isFirebaseConfigured } from '@/lib/firebase-client'

type ArticleStatus = 'draft' | 'published'

export interface PersistArticleInput {
  id?: string
  title: string
  content: string
  category: string
  tags: string[]
  locale: string
  wordCount: number
  readTime: number
}

function createSlug(rawTitle: string): string {
  const base = rawTitle
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i')
    .replace(/İ/g, 'i')
    .replace(/ş/g, 's')
    .replace(/Ş/g, 's')
    .replace(/ğ/g, 'g')
    .replace(/Ğ/g, 'g')
    .replace(/ç/g, 'c')
    .replace(/Ç/g, 'c')
    .replace(/ö/g, 'o')
    .replace(/Ö/g, 'o')
    .replace(/ü/g, 'u')
    .replace(/Ü/g, 'u')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

  return base || `article-${Date.now()}`
}

export async function persistArticle(
  input: PersistArticleInput,
  status: ArticleStatus
): Promise<{ id: string }> {
  if (!isFirebaseConfigured()) {
    throw new Error('Firebase is not configured.')
  }

  const db = getFirebaseDb()
  const now = serverTimestamp()
  const ref = input.id
    ? doc(db, 'articles', input.id)
    : doc(collection(db, 'articles'))

  const payload = {
    title: input.title.trim(),
    slug: createSlug(input.title),
    content: input.content,
    category: input.category,
    tags: input.tags,
    locale: input.locale,
    wordCount: input.wordCount,
    readTime: input.readTime,
    status,
    updatedAt: now,
    ...(input.id ? {} : { createdAt: now }),
    ...(status === 'published' ? { publishedAt: now } : {}),
  }

  await setDoc(ref, payload, { merge: true })
  return { id: ref.id }
}
