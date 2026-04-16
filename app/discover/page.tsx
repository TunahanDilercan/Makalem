import { AppShell } from '@/components/app-shell'
import { DiscoverPage } from '@/components/discover-page'
import type { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Keşfet',
  description: 'Tüm kategorilerdeki makaleleri keşfet ve filtrele.',
}

export default function Page() {
  return (
    <AppShell>
      <Suspense fallback={null}>
        <DiscoverPage />
      </Suspense>
    </AppShell>
  )
}
