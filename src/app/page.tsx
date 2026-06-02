"use client"

import { useState, useEffect, useMemo, useCallback } from 'react'
import { Package, Loader2 } from 'lucide-react'
import Header from '@/components/Header'
import FilterSidebar from '@/components/FilterSidebar'
import AccountCard from '@/components/AccountCard'
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

  // Filtros + Ordenação
  const filtered = useMemo(() => {
    let result = accounts.filter((acc) => {
      // Status
      if (statusFilter.length > 0 && !statusFilter.includes(acc.status)) {
        return false
      }
      // Servidor
      if (serverFilter.length > 0 && !serverFilter.includes(acc.server || '')) {
        return false
      }
      // AR
      const ar = acc.ar || 0
      if (ar < minAr || ar > maxAr) {
        return false
      }
      // Busca
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

    // Ordenação
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
        // Já vem ordenado do Supabase por updated_at desc
        break
    }

    return result
  }, [accounts, search, statusFilter, serverFilter, minAr, maxAr, priceSort])

  return (
    <main className="min-h-screen bg-genshin-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Header />

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
            {/* Contador */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-genshin-muted text-sm">
                <Package className="inline w-4 h-4 mr-1 -mt-0.5" />
                {filtered.length} {filtered.length === 1 ? 'conta encontrada' : 'contas encontradas'}
              </p>
              {lastUpdate && (
                <p className="text-genshin-muted text-xs">
                  Atualizado às {lastUpdate}
                </p>
              )}
            </div>

            <div className="h-px bg-genshin-border mb-6" />

            {/* Loading */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-genshin-accent animate-spin mb-4" />
                <p className="text-genshin-muted">Carregando contas...</p>
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="bg-genshin-card border border-genshin-danger/30 rounded-xl p-6 text-center">
                <p className="text-genshin-danger font-medium mb-2">{error}</p>
                <button
                  onClick={loadData}
                  className="px-4 py-2 bg-genshin-accent hover:bg-genshin-accent-hover text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Tentar novamente
                </button>
              </div>
            )}

            {/* Empty */}
            {!loading && !error && accounts.length === 0 && (
              <div className="bg-genshin-card border border-genshin-border rounded-xl p-8 text-center">
                <p className="text-genshin-muted text-lg mb-2">⚠️ Nenhuma conta disponível no momento.</p>
                <p className="text-genshin-muted text-sm">
                  Verifique se o Supabase está configurado corretamente.
                </p>
              </div>
            )}

            {/* No results after filter */}
            {!loading && !error && accounts.length > 0 && filtered.length === 0 && (
              <div className="bg-genshin-card border border-genshin-border rounded-xl p-8 text-center">
                <p className="text-genshin-muted">Nenhuma conta encontrada com os filtros selecionados.</p>
              </div>
            )}

            {/* Cards */}
            {!loading && !error && filtered.length > 0 && (
              <div className="space-y-4">
                {filtered.map((account) => (
                  <AccountCard key={account.id} account={account} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-genshin-border text-center">
          <p className="text-genshin-muted text-xs">
            Genshin Account Manager Pro • Última atualização: {lastUpdate || '--:--:--'}
          </p>
        </footer>
      </div>
    </main>
  )
}

function extractPrice(priceStr: string | undefined): number {
  if (!priceStr) return 999999
  // Remove tudo exceto dígitos e pontos/vírgulas
  const cleaned = priceStr.replace(/[^\d.,]/g, '')
  // Tenta detectar formato
  if (cleaned.includes(',')) {
    // Pode ser 1.500,00 ou 1500,00
    const parts = cleaned.split(/[.,]/)
    if (parts.length > 2) {
      // Formato brasileiro: 1.500,00
      return parseFloat(cleaned.replace(/\./g, '').replace(',', '.')) || 999999
    }
    return parseFloat(cleaned.replace(',', '.')) || 999999
  }
  return parseFloat(cleaned) || 999999
}
