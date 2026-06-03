"use client"

import { Heart, Sword } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="mt-16 pt-8 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Sword className="w-4 h-4 text-purple-400" />
            <span>Genshin Account Manager Pro</span>
          </div>
          <div className="flex items-center gap-1 text-slate-600 text-sm">
            <span>Feito com</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>para jogadores</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
