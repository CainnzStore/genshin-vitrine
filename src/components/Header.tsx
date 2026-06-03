"use client"

import { Sword, Sparkles, TrendingUp, Users } from 'lucide-react'

interface HeaderProps {
  totalAccounts?: number
  availableCount?: number
  avgAr?: number
}

export default function Header({ totalAccounts = 0, availableCount = 0, avgAr = 0 }: HeaderProps) {
  return (
    <header className="relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 text-center py-12 px-4">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-purple-300 mb-6 animate-fade-in-up">
          <Sparkles className="w-4 h-4" />
          <span>Contas Verificadas • Atualizado em tempo real</span>
        </div>

        {/* Title */}
        <div className="flex items-center justify-center gap-3 mb-4 animate-fade-in-up delay-100">
          <div className="relative">
            <Sword className="w-10 h-10 text-purple-400 animate-float" />
            <div className="absolute inset-0 w-10 h-10 bg-purple-500/30 blur-xl rounded-full" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
            <span className="gradient-text">Catálogo de Contas</span>
          </h1>
        </div>

        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200">
          Genshin Impact • As melhores contas do mercado
        </p>

        {/* Stats Bar */}
        {totalAccounts > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 animate-fade-in-up delay-300">
            <StatBadge
              icon={<Users className="w-5 h-5" />}
              value={totalAccounts}
              label="Total de Contas"
              color="text-purple-400"
            />
            <StatBadge
              icon={<Sparkles className="w-5 h-5" />}
              value={availableCount}
              label="Disponíveis"
              color="text-emerald-400"
            />
            <StatBadge
              icon={<TrendingUp className="w-5 h-5" />}
              value={`AR ${avgAr}`}
              label="Média de AR"
              color="text-cyan-400"
              isText
            />
          </div>
        )}
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[var(--bg)] to-transparent pointer-events-none" />
    </header>
  )
}

function StatBadge({ icon, value, label, color, isText = false }: {
  icon: React.ReactNode
  value: number | string
  label: string
  color: string
  isText?: boolean
}) {
  return (
    <div className="glass rounded-xl px-5 py-3 flex items-center gap-3 card-lift">
      <div className={`${color}`}>{icon}</div>
      <div className="text-left">
        <div className={`text-xl font-bold ${isText ? color : 'text-white'}`}>
          {value}
        </div>
        <div className="text-xs text-slate-500">{label}</div>
      </div>
    </div>
  )
}
