"use client"

import { useState } from 'react'
import { Search, RefreshCw, Filter, SlidersHorizontal, X } from 'lucide-react'

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

  const activeFiltersCount = statusFilter.length + serverFilter.length + (search ? 1 : 0)

  const clearAll = () => {
    setSearch('')
    setStatusFilter([])
    setServerFilter([])
    setMinAr(1)
    setMaxAr(60)
    setPriceSort('recent')
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
            className="text-xs text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Limpar
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="Buscar conta, personagem..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
        />
      </div>

      {/* Status */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
          <Filter className="w-4 h-4 text-emerald-400" />
          Status
          {statusFilter.length > 0 && (
            <span className="ml-auto text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">
              {statusFilter.length}
            </span>
          )}
        </label>
        <div className="space-y-2">
          {STATUSES.map((status) => (
            <label key={status} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-white/5 transition-colors">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={statusFilter.includes(status)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setStatusFilter([...statusFilter, status])
                    } else {
                      setStatusFilter(statusFilter.filter((s) => s !== status))
                    }
                  }}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 rounded-md border border-slate-600 peer-checked:bg-purple-500 peer-checked:border-purple-500 transition-all flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">
                {status}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Server */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
          <Filter className="w-4 h-4 text-cyan-400" />
          Servidor
          {serverFilter.length > 0 && (
            <span className="ml-auto text-xs bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full">
              {serverFilter.length}
            </span>
          )}
        </label>
        <div className="space-y-2">
          {SERVERS.map((server) => (
            <label key={server} className="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-white/5 transition-colors">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={serverFilter.includes(server)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setServerFilter([...serverFilter, server])
                    } else {
                      setServerFilter(serverFilter.filter((s) => s !== server))
                    }
                  }}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 rounded-md border border-slate-600 peer-checked:bg-cyan-500 peer-checked:border-cyan-500 transition-all flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">
                {server}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* AR Range */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
          <Filter className="w-4 h-4 text-amber-400" />
          Adventure Rank
        </label>
        <div className="px-2">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span>AR {minAr}</span>
            <span>AR {maxAr}</span>
          </div>
          <div className="relative h-2 bg-slate-800 rounded-full mb-4">
            <div
              className="absolute h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
              style={{
                left: `${((minAr - 1) / 59) * 100}%`,
                right: `${((60 - maxAr) / 59) * 100}%`
              }}
            />
          </div>
          <div className="flex gap-3">
            <input
              type="number"
              min={1}
              max={60}
              value={minAr}
              onChange={(e) => setMinAr(Math.min(Number(e.target.value), maxAr))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white text-center focus:outline-none focus:border-purple-500/50 transition-all"
            />
            <input
              type="number"
              min={1}
              max={60}
              value={maxAr}
              onChange={(e) => setMaxAr(Math.max(Number(e.target.value), minAr))}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white text-center focus:outline-none focus:border-purple-500/50 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Sort */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
          <Filter className="w-4 h-4 text-pink-400" />
          Ordenar por
        </label>
        <div className="space-y-1.5">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setPriceSort(opt.value)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all ${priceSort === opt.value
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
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
        className="w-full flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl px-4 py-3 text-sm font-medium transition-all active:scale-95"
      >
        <RefreshCw className="w-4 h-4" />
        Atualizar dados
      </button>

      {/* Contact */}
      <div className="mt-6 p-4 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-xl">
        <h4 className="text-white font-bold mb-2 flex items-center gap-2">
          <span className="text-lg">📞</span> Contato
        </h4>
        <p className="text-slate-400 text-sm leading-relaxed">
          Interessado em alguma conta? Entre em contato!
        </p>
        <div className="mt-3 text-xs text-purple-300 font-medium">
          ✓ Contas verificadas<br />
          ✓ Entrega segura
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-purple-600 text-white shadow-lg shadow-purple-600/30 flex items-center justify-center"
      >
        <SlidersHorizontal className="w-6 h-6" />
        {activeFiltersCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
            {activeFiltersCount}
          </span>
        )}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        lg:w-80 lg:shrink-0
        ${mobileOpen
          ? 'fixed inset-y-0 left-0 z-50 w-80 p-6 bg-[var(--bg)] overflow-y-auto border-r border-white/10'
          : 'hidden lg:block lg:sticky lg:top-6 lg:self-start'
        }
      `}>
        <div className="lg:glass lg:rounded-2xl lg:p-6">
          <SidebarContent />
        </div>
      </aside>
    </>
  )
}
