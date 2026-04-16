import { AppShell } from '@/components/app-shell'
import { EditorPage } from '@/components/editor-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Yaz',
  description: 'Makalem bilgi bankası için makale yaz ve yayınla.',
}

export default function Page() {
  return (
    <AppShell>
      <EditorPage />
    </AppShell>
  )
}
