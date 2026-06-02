"use client"

import { Sword } from 'lucide-react'

export default function Header() {
  return (
    <header className="text-center py-8 px-4">
      <div className="flex items-center justify-center gap-3 mb-2">
        <Sword className="w-8 h-8 text-genshin-accent" />
        <h1 className="text-3xl md:text-4xl font-extrabold text-genshin-text tracking-tight">
          Catálogo de Contas
        </h1>
      </div>
      <p className="text-genshin-muted text-base">
        Genshin Impact • Contas verificadas
      </p>
    </header>
  )
}
