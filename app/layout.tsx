import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { I18nProvider } from '@/components/i18n-provider'
import { DEFAULT_LOCALE } from '@/lib/i18n'
import './globals.css'

export const metadata: Metadata = {
  applicationName: 'Makalem',
  title: {
    default: 'Makalem — Bilgi Bankası',
    template: '%s | Makalem',
  },
  description:
    'Takımlar ve üreticiler için modern bir bilgi bankası. Makaleleri keşfet, yaz ve paylaş.',
  keywords: ['bilgi bankası', 'wiki', 'dokümantasyon', 'makale'],
  authors: [{ name: 'Makalem' }],
  openGraph: {
    type: 'website',
    title: 'Makalem — Bilgi Bankası',
    description: 'Takımlar ve üreticiler için modern bir bilgi bankası.',
    siteName: 'Makalem',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      {
        url: '/logo.png',
        sizes: '768x768',
        type: 'image/png',
      },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon.ico'],
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Makalem',
    statusBarStyle: 'default',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f9f9f9' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1f' },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = DEFAULT_LOCALE

  return (
    <html
      lang={locale}
      className="bg-background"
      suppressHydrationWarning
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        <I18nProvider initialLocale={locale}>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            {children}
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
