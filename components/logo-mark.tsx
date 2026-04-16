'use client'

import { cn } from '@/lib/utils'

interface LogoMarkProps {
  className?: string
}

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <span
      aria-hidden
      className={cn('block bg-zinc-900 dark:bg-zinc-100', className)}
      style={{
        WebkitMaskImage: "url('/logo.svg')",
        maskImage: "url('/logo.svg')",
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
      }}
    />
  )
}
