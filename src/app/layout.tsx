import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Genshin Impact • Catálogo Premium de Contas',
  description: 'Catálogo exclusivo de contas verificadas de Genshin Impact. Personagens 5★, armas assinatura e recursos garantidos.',
  keywords: ['genshin impact', 'contas genshin', 'venda contas', 'catálogo genshin'],
  openGraph: {
    title: 'Catálogo Premium de Contas Genshin Impact',
    description: 'As melhores contas verificadas do mercado',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-[var(--bg)] antialiased">
        {children}
      </body>
    </html>
  )
}
