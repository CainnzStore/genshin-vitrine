"use client"

import { useState, useEffect, useMemo, useCallback } from 'react'
import { Package, Loader2, Sparkles } from 'lucide-react'
import Header from '@/components/Header'
import FilterSidebar from '@/components/FilterSidebar'
import AccountCard from '@/components/AccountCard'
import LoadingSkeleton from '@/components/LoadingSkeleton'
import EmptyState from '@/components/EmptyState'
import Footer from '@/components/Footer'
import { fetchAccounts, parseJsonField } from '@/lib/supabase'
import { Account } from '@/types/account'

export default function Home() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<string>('')

  // Filtros
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string[]>(['Disponível'])
  const [serverFilter, setServerFilter] = useState<string[]>([])
  const [minAr, setMinAr] = useState(1)
  const [maxAr, setMaxAr] = useState(60)
  const [priceSort, setPriceSort] = useState('recent')

  const loadData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchAccounts()
      setAccounts(data)
      setLastUpdate(new Date().toLocaleTimeString('pt-BR'))
    } catch (err) {
      setError('Erro ao carregar contas. Tente novamente.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  // Stats
  const stats = useMemo(() => {
    const total = accounts.length
    const available = accounts.filter(a => a.status === 'Disponível').length
    const avgAr = total > 0 ? Math.round(accounts.reduce((sum, a) => sum + (a.ar || 0), 0) / total) : 0
    return { total, available, avgAr }
  }, [accounts])

  // Filtros + Ordenação
  const filtered = useMemo(() => {
    let result = accounts.filter((acc) => {
      if (statusFilter.length > 0 && !statusFilter.includes(acc.status)) {
        return false
      }
      if (serverFilter.length > 0 && !serverFilter.includes(acc.server || '')) {
        return false
      }
      const ar = acc.ar || 0
      if (ar < minAr || ar > maxAr) {
        return false
      }
      if (search.trim()) {
        const term = search.toLowerCase()
        const chars = parseJsonField<{ character_name: string }[]>(acc.characters_json)
        const charNames = chars.map((c) => c.character_name).join(' ')
        const blob = `${acc.name} ${acc.tags || ''} ${charNames}`.toLowerCase()
        if (!blob.includes(term)) {
          return false
        }
      }
      return true
    })

    switch (priceSort) {
      case 'price':
        result.sort((a, b) => {
          const pa = extractPrice(a.price)
          const pb = extractPrice(b.price)
          return pa - pb
        })
        break
      case 'ar':
        result.sort((a, b) => (b.ar || 0) - (a.ar || 0))
        break
      case 'chars':
        result.sort((a, b) => {
          const ca = parseJsonField<unknown[]>(a.characters_json).length
          const cb = parseJsonField<unknown[]>(b.characters_json).length
          return cb - ca
        })
        break
      case 'recent':
      default:
        break
    }

    return result
  }, [accounts, search, statusFilter, serverFilter, minAr, maxAr, priceSort])

  const clearAllFilters = () => {
    setSearch('')
    setStatusFilter([])
    setServerFilter([])
    setMinAr(1)
    setMaxAr(60)
    setPriceSort('recent')
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] noise-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <Header
          totalAccounts={stats.total}
          availableCount={stats.available}
          avgAr={stats.avgAr}
        />

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar */}
          <FilterSidebar
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            serverFilter={serverFilter}
            setServerFilter={setServerFilter}
            minAr={minAr}
            maxAr={maxAr}
            setMinAr={setMinAr}
            setMaxAr={setMaxAr}
            priceSort={priceSort}
            setPriceSort={setPriceSort}
            onRefresh={loadData}
          />

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-purple-400" />
                <span className="text-slate-400 text-sm">
                  <span className="text-white font-bold">{filtered.length}</span>
                  {' '}{filtered.length === 1 ? 'conta' : 'contas'}
                  {filtered.length !== accounts.length && (
                    <span className="text-slate-600"> de {accounts.length}</span>
                  )}
                </span>
              </div>
              {lastUpdate && (
                <span className="text-slate-600 text-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Atualizado às {lastUpdate}
                </span>
              )}
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent mb-6" />

            {/* Loading */}
            {loading && <LoadingSkeleton />}

            {/* Error */}
            {!loading && error && (
              <div className="glass rounded-2xl p-8 text-center animate-fade-in-up">
                <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                  <Loader2 className="w-8 h-8 text-red-400" />
                </div>
                <p className="text-red-400 font-medium mb-4">{error}</p>
                <button
                  onClick={loadData}
                  className="px-5 py-2.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-xl text-sm font-medium transition-all"
                >
                  Tentar novamente
                </button>
              </div>
            )}

            {/* Empty - no accounts at all */}
            {!loading && !error && accounts.length === 0 && (
              <EmptyState hasFilters={false} />
            )}

            {/* Empty - filtered out */}
            {!loading && !error && accounts.length > 0 && filtered.length === 0 && (
              <EmptyState hasFilters={true} onClearFilters={clearAllFilters} />
            )}

            {/* Cards */}
            {!loading && !error && filtered.length > 0 && (
              <div className="space-y-4">
                {filtered.map((account, idx) => (
                  <AccountCard key={account.id} account={account} index={idx} />
                ))}
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </main>
  )
}

function extractPrice(priceStr: string | undefined): number {
  if (!priceStr) return 999999
  const cleaned = priceStr.replace(/[^\d.,]/g, '')
  if (cleaned.includes(',')) {
    const parts = cleaned.split(/[.,]/)
    if (parts.length > 2) {
      return parseFloat(cleaned.replace(/\./g, '').replace(',', '.')) || 999999
    }
    return parseFloat(cleaned.replace(',', '.')) || 999999
  }
  return parseFloat(cleaned) || 999999
}
