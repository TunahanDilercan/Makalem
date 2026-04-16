import { AppShell } from '@/components/app-shell'
import { SettingsPage } from '@/components/settings-page'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ayarlar',
  description: 'Dil, tema ve Firebase baglanti ayarlarini yonet.',
}

export default function Page() {
  return (
    <AppShell>
      <SettingsPage />
    </AppShell>
  )
}
