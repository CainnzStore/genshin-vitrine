"use client"

import { useState } from 'react'
import { Search, RefreshCw, Filter } from 'lucide-react'

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
  { value: "recent", label: "Mais recente" },
  { value: "price", label: "Menor preço" },
  { value: "ar", label: "Maior AR" },
  { value: "chars", label: "Mais personagens" },
]

export default function FilterSidebar({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  serverFilter,
  setServerFilter,
  minAr,
  maxAr,
  setMinAr,
  setMaxAr,
  priceSort,
  setPriceSort,
  onRefresh,
}: FilterSidebarProps) {
  const [localMinAr, setLocalMinAr] = useState(minAr)
  const [localMaxAr, setLocalMaxAr] = useState(maxAr)

  const handleArChange = () => {
    setMinAr(Math.min(localMinAr, localMaxAr))
    setMaxAr(Math.max(localMinAr, localMaxAr))
  }

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-genshin-accent" />
        <h3 className="text-lg font-bold text-genshin-text">Filtros</h3>
      </div>

      {/* Busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-genshin-muted" />
        <input
          type="text"
          placeholder="Buscar nome, personagem..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-genshin-card border border-genshin-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-genshin-text placeholder:text-genshin-muted focus:outline-none focus:border-genshin-accent transition-colors"
        />
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-semibold text-genshin-text mb-2">Status</label>
        <div className="space-y-2">
          {STATUSES.map((status) => (
            <label key={status} className="flex items-center gap-2 cursor-pointer group">
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
                className="w-4 h-4 rounded border-genshin-border bg-genshin-card text-genshin-accent focus:ring-genshin-accent focus:ring-offset-0"
              />
              <span className="text-sm text-genshin-muted group-hover:text-genshin-text transition-colors">
                {status}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Servidor */}
      <div>
        <label className="block text-sm font-semibold text-genshin-text mb-2">Servidor</label>
        <div className="space-y-2">
          {SERVERS.map((server) => (
            <label key={server} className="flex items-center gap-2 cursor-pointer group">
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
                className="w-4 h-4 rounded border-genshin-border bg-genshin-card text-genshin-accent focus:ring-genshin-accent focus:ring-offset-0"
              />
              <span className="text-sm text-genshin-muted group-hover:text-genshin-text transition-colors">
                {server}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* AR Range */}
      <div>
        <label className="block text-sm font-semibold text-genshin-text mb-2">
          AR: {minAr} - {maxAr}
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            min={1}
            max={60}
            value={localMinAr}
            onChange={(e) => setLocalMinAr(Number(e.target.value))}
            onBlur={handleArChange}
            className="w-20 bg-genshin-card border border-genshin-border rounded-lg px-3 py-2 text-sm text-genshin-text focus:outline-none focus:border-genshin-accent"
          />
          <span className="text-genshin-muted">até</span>
          <input
            type="number"
            min={1}
            max={60}
            value={localMaxAr}
            onChange={(e) => setLocalMaxAr(Number(e.target.value))}
            onBlur={handleArChange}
            className="w-20 bg-genshin-card border border-genshin-border rounded-lg px-3 py-2 text-sm text-genshin-text focus:outline-none focus:border-genshin-accent"
          />
        </div>
      </div>

      {/* Ordenação */}
      <div>
        <label className="block text-sm font-semibold text-genshin-text mb-2">Ordenar por</label>
        <select
          value={priceSort}
          onChange={(e) => setPriceSort(e.target.value)}
          className="w-full bg-genshin-card border border-genshin-border rounded-lg px-3 py-2.5 text-sm text-genshin-text focus:outline-none focus:border-genshin-accent"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Atualizar */}
      <button
        onClick={onRefresh}
        className="w-full flex items-center justify-center gap-2 bg-genshin-card hover:bg-genshin-border border border-genshin-border text-genshin-text rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
      >
        <RefreshCw className="w-4 h-4" />
        Atualizar dados
      </button>

      {/* Contato */}
      <div className="mt-6 p-4 bg-genshin-card border border-genshin-border rounded-xl">
        <h4 className="text-genshin-text font-bold mb-2">📞 Contato</h4>
        <p className="text-genshin-muted text-sm leading-relaxed">
          Interessado? Entre em contato!
          <br /><br />
          <span className="text-genshin-accent font-semibold">
            Contas verificadas e entregues com segurança.
          </span>
        </p>
      </div>
    </aside>
  )
}
