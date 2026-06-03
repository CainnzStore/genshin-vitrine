"use client"

import { PackageX, Search, RotateCcw } from 'lucide-react'

interface EmptyStateProps {
  hasFilters: boolean
  onClearFilters?: () => void
}

export default function EmptyState({ hasFilters, onClearFilters }: EmptyStateProps) {
  return (
    <div className="glass rounded-2xl p-12 text-center animate-fade-in-up">
      <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
        {hasFilters ? (
          <Search className="w-10 h-10 text-slate-500" />
        ) : (
          <PackageX className="w-10 h-10 text-slate-500" />
        )}
      </div>
      <h3 className="text-xl font-bold text-white mb-2">
        {hasFilters ? 'Nenhuma conta encontrada' : 'Nenhuma conta disponível'}
      </h3>
      <p className="text-slate-400 mb-6 max-w-md mx-auto">
        {hasFilters 
          ? 'Tente ajustar os filtros ou limpar a busca para ver mais resultados.' 
          : 'As contas sincronizadas do desktop aparecerão aqui. Verifique se o Supabase está configurado.'}
      </p>
      {hasFilters && onClearFilters && (
        <button
          onClick={onClearFilters}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-xl text-sm font-medium transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          Limpar filtros
        </button>
      )}
    </div>
  )
}
