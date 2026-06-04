"use client"

import { Sword, Sparkles, TrendingUp, Users, Shield } from 'lucide-react'

interface HeaderProps {
  totalAccounts?: number
  availableCount?: number
  avgAr?: number
}

export default function Header({ totalAccounts = 0, availableCount = 0, avgAr = 0 }: HeaderProps) {
  return (
    <header className="relative">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 text-center pt-10 pb-8 px-4">
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-sm text-purple-300 mb-6 animate-fade-in-up">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Contas Verificadas • Atualizado em tempo real</span>
        </div>

        {/* Main title */}
        <div className="flex items-center justify-center gap-3 mb-3 animate-fade-in-up delay-100">
          <div className="relative">
            <Sword className="w-9 h-9 text-purple-400" />
            <div className="absolute inset-0 w-9 h-9 bg-purple-500/20 blur-xl rounded-full" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Catálogo de Contas
            </span>
          </h1>
        </div>

        <p className="text-slate-500 text-base md:text-lg max-w-xl mx-auto mb-8 animate-fade-in-up delay-200">
          Genshin Impact • As melhores contas do mercado
        </p>

        {/* Stats */}
        {totalAccounts > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 animate-fade-in-up delay-300">
            <StatCard
              icon={<Users className="w-5 h-5" />}
              value={totalAccounts}
              label="Total"
              gradient="from-purple-500/20 to-purple-600/10"
              border="border-purple-500/20"
              text="text-purple-300"
            />
            <StatCard
              icon={<Shield className="w-5 h-5" />}
              value={availableCount}
              label="Disponíveis"
              gradient="from-emerald-500/20 to-emerald-600/10"
              border="border-emerald-500/20"
              text="text-emerald-300"
            />
            <StatCard
              icon={<TrendingUp className="w-5 h-5" />}
              value={`AR ${avgAr}`}
              label="Média"
              gradient="from-blue-500/20 to-cyan-600/10"
              border="border-blue-500/20"
              text="text-blue-300"
              isText
            />
          </div>
        )}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0a12] to-transparent pointer-events-none" />
    </header>
  )
}

function StatCard({ icon, value, label, gradient, border, text, isText = false }: {
  icon: React.ReactNode
  value: number | string
  label: string
  gradient: string
  border: string
  text: string
  isText?: boolean
}) {
  return (
    <div className={`bg-gradient-to-br ${gradient} ${border} border rounded-xl px-5 py-3 flex items-center gap-3 backdrop-blur-sm`}>
      <div className={`${text}`}>{icon}</div>
      <div className="text-left">
        <div className={`text-lg font-bold ${isText ? text : 'text-white'}`}>
          {value}
        </div>
        <div className="text-xs text-slate-500">{label}</div>
      </div>
    </div>
  )
}
