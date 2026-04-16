import { AppShell } from '@/components/app-shell'
import { LibraryPage } from '@/components/library-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kütüphanem',
  description: 'Kaydettiklerin, okuma geçmişin ve notların.',
}

export default function Page() {
  return (
    <AppShell>
      <LibraryPage />
    </AppShell>
  )
}
