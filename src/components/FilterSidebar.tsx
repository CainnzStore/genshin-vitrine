"use client"

import { useState } from 'react'
import { Search, RefreshCw, SlidersHorizontal, X, ChevronDown } from 'lucide-react'

interface FilterSidebarProps {
  search: string
  setSearch: (s: string) => void
  statusFilter: string[]
  setStatusFilter: (s: string[]) => void
  serverFilter: string[]
  setServerFilter: (s: string[]) => void
  minAr: number
  maxAr: number
  setMinAr: (n: number) => void
  setMaxAr: (n: number) => void
  priceSort: string
  setPriceSort: (s: string) => void
  onRefresh: () => void
}

const STATUSES = ["Disponível", "Reservada", "Vendida", "Pausada", "Farmando", "Revisar"]
const SERVERS = ["America", "Europe", "Asia", "TW/HK/MO", "Outro"]
const AR_PRESETS = [
  { label: "Qualquer", min: 1, max: 60 },
  { label: "AR 40+", min: 40, max: 60 },
  { label: "AR 50+", min: 50, max: 60 },
  { label: "AR 55+", min: 55, max: 60 },
  { label: "AR 60", min: 60, max: 60 },
]
const SORT_OPTIONS = [
  { value: "recent", label: "⭐ Mais recente" },
  { value: "price", label: "💰 Menor preço" },
  { value: "ar", label: "📈 Maior AR" },
  { value: "chars", label: "👥 Mais personagens" },
]

export default function FilterSidebar({
  search, setSearch,
  statusFilter, setStatusFilter,
  serverFilter, setServerFilter,
  minAr, maxAr, setMinAr, setMaxAr,
  priceSort, setPriceSort,
  onRefresh,
}: FilterSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const activeFiltersCount = statusFilter.length + serverFilter.length + (search ? 1 : 0)

  const clearAll = () => {
    setSearch('')
    setStatusFilter([])
    setServerFilter([])
    setMinAr(1)
    setMaxAr(60)
    setPriceSort('recent')
  }

  const isArPresetActive = (presetMin: number, presetMax: number) => {
    return minAr === presetMin && maxAr === presetMax
  }

  const applyArPreset = (presetMin: number, presetMax: number) => {
    if (isArPresetActive(presetMin, presetMax)) {
      setMinAr(1)
      setMaxAr(60)
    } else {
      setMinAr(presetMin)
      setMaxAr(presetMax)
    }
  }

  const toggleStatus = (status: string) => {
    if (statusFilter.includes(status)) {
      setStatusFilter(statusFilter.filter((s) => s !== status))
    } else {
      setStatusFilter([...statusFilter, status])
    }
  }

  const toggleServer = (server: string) => {
    if (serverFilter.includes(server)) {
      setServerFilter(serverFilter.filter((s) => s !== server))
    } else {
      setServerFilter([...serverFilter, server])
    }
  }

  const SidebarContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-bold text-white">Filtros</h3>
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearAll}
            className="text-xs text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white/5"
          >
            <X className="w-3 h-3" /> Limpar
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="Buscar conta, personagem..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-purple-500/40 focus:bg-white/[0.05] transition-all"
        />
      </div>

      {/* Status - Chips */}
      <div>
        <label className="text-sm font-semibold text-slate-300 mb-3 block">Status</label>
        <div className="flex flex-wrap gap-2">
          {STATUSES.map((status) => {
            const active = statusFilter.includes(status)
            return (
              <button
                key={status}
                onClick={() => toggleStatus(status)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${active
                    ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-lg shadow-purple-500/25 scale-105'
                    : 'bg-white/[0.04] text-slate-400 border border-white/[0.08] hover:bg-white/[0.08] hover:text-slate-200'
                  }`}
              >
                {status}
              </button>
            )
          })}
        </div>
      </div>

      {/* Server - Chips */}
      <div>
        <label className="text-sm font-semibold text-slate-300 mb-3 block">Servidor</label>
        <div className="flex flex-wrap gap-2">
          {SERVERS.map((server) => {
            const active = serverFilter.includes(server)
            return (
              <button
                key={server}
                onClick={() => toggleServer(server)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${active
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-500 text-white shadow-lg shadow-cyan-500/25 scale-105'
                    : 'bg-white/[0.04] text-slate-400 border border-white/[0.08] hover:bg-white/[0.08] hover:text-slate-200'
                  }`}
              >
                {server}
              </button>
            )
          })}
        </div>
      </div>

      {/* AR - Chips */}
      <div>
        <label className="text-sm font-semibold text-slate-300 mb-3 block">AR mínimo</label>
        <div className="flex flex-wrap gap-2">
          {AR_PRESETS.map((preset) => {
            const active = isArPresetActive(preset.min, preset.max)
            return (
              <button
                key={preset.label}
                onClick={() => applyArPreset(preset.min, preset.max)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${active
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25 scale-105'
                    : 'bg-white/[0.04] text-slate-400 border border-white/[0.08] hover:bg-white/[0.08] hover:text-slate-200'
                  }`}
              >
                {preset.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Sort */}
      <div>
        <label className="text-sm font-semibold text-slate-300 mb-3 block">Ordenar por</label>
        <div className="space-y-1.5">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setPriceSort(opt.value)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-all duration-200 ${priceSort === opt.value
                  ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 border border-purple-500/30'
                  : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
                }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Refresh */}
      <button
        onClick={onRefresh}
        className="w-full flex items-center justify-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white rounded-xl px-4 py-3 text-sm font-medium transition-all active:scale-95"
      >
        <RefreshCw className="w-4 h-4" />
        Atualizar dados
      </button>

      {/* Contact */}
      <div className="mt-6 p-5 bg-gradient-to-br from-purple-500/[0.08] to-cyan-500/[0.08] border border-purple-500/20 rounded-2xl">
        <h4 className="text-white font-bold mb-2">📞 Contato</h4>
        <p className="text-slate-400 text-sm leading-relaxed">
          Interessado em alguma conta? Entre em contato!
        </p>
        <div className="mt-3 space-y-1 text-xs text-purple-300/80">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Contas verificadas
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Entrega segura
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile FAB */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-xl shadow-purple-500/30 flex items-center justify-center transition-transform active:scale-90"
      >
        <SlidersHorizontal className="w-6 h-6" />
        {activeFiltersCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-bold">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        lg:w-80 lg:shrink-0
        ${mobileOpen
          ? 'fixed inset-y-0 left-0 z-50 w-80 p-6 bg-[#0a0a12] overflow-y-auto border-r border-white/[0.06]'
          : 'hidden lg:block lg:sticky lg:top-6 lg:self-start'
        }
      `}>
        <div className="lg:bg-white/[0.02] lg:backdrop-blur-xl lg:border lg:border-white/[0.06] lg:rounded-2xl lg:p-6">
          <SidebarContent />
        </div>
      </aside>
    </>
  )
}
