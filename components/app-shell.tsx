'use client'

import { useState } from 'react'
import { Sidebar } from '@/components/sidebar'
import { TopHeader } from '@/components/top-header'
import { MobileNav } from '@/components/mobile-nav'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <div className="hidden md:block">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      </div>
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <TopHeader />
        <main className="flex-1 overflow-y-auto pb-16 md:pb-0">{children}</main>
        <MobileNav />
      </div>
    </div>
  )
}
