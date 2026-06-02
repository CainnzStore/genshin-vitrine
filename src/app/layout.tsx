import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Genshin Impact - Catálogo de Contas',
  description: 'Catálogo de contas verificadas de Genshin Impact',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-genshin-bg antialiased">
        {children}
      </body>
    </html>
  )
}
