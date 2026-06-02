"use client"

import { useState } from 'react'
import { ChevronDown, ChevronUp, Gem, Sparkles, Star, Zap, Moon, Sun } from 'lucide-react'
import { Account, Character, Weapon } from '@/types/account'
import { parseJsonField, parseJsonDict } from '@/lib/supabase'

interface AccountCardProps {
  account: Account
}

const ELEMENT_ICONS: Record<string, string> = {
  Pyro: '🔥',
  Hydro: '💧',
  Electro: '⚡',
  Cryo: '❄️',
  Geo: '🟡',
  Anemo: '🌪️',
  Dendro: '🌿',
}

const ELEMENT_COLORS: Record<string, string> = {
  Pyro: '#DC2626',
  Hydro: '#0284C7',
  Electro: '#7C3AED',
  Cryo: '#38BDF8',
  Geo: '#D97706',
  Anemo: '#0D9488',
  Dendro: '#16A34A',
}

const STATUS_COLORS: Record<string, string> = {
  Disponível: '#10B981',
  Reservada: '#F59E0B',
  Vendida: '#6B7280',
  Pausada: '#7C3AED',
  Farmando: '#0891B2',
  Revisar: '#EF4444',
}

const MAP_AREAS: [string, string][] = [
  ["mondstadt", "Mondstadt"],
  ["dragonspine", "Espinha do Dragão"],
  ["liyue", "Liyue"],
  ["chasm_surface", "Despenhadeiro - Sup."],
  ["chasm_underground", "Despenhadeiro - Sub."],
  ["chenyu_vale", "Vale Chenyu"],
  ["inazuma", "Inazuma"],
  ["enkanomiya", "Enkanomiya"],
  ["sumeru_rainforest", "Sumeru - Floresta"],
  ["sumeru_desert", "Sumeru - Deserto"],
  ["hadramaveth", "Hadramaveth"],
  ["girdle_of_the_sands", "Cinturão das Areias"],
  ["fontaine", "Fontaine"],
  ["sea_of_bygone_eras", "Mar das Eras Passadas"],
  ["natlan", "Natlan"],
  ["sacred_mountain", "Montanha Sagrada"],
  ["ancient_temple", "Templo Antigo"],
]

function sanitizeHtml(text: string): string {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

export default function AccountCard({ account }: AccountCardProps) {
  const [expanded, setExpanded] = useState(false)

  const characters = parseJsonField<Character[]>(account.characters_json)
  const weapons = parseJsonField<Weapon[]>(account.weapons_json)
  const mapProgress = parseJsonDict(account.map_progress_json)

  const statusColor = STATUS_COLORS[account.status] || '#334155'
  const tags = account.tags
    ? account.tags.split(',').map((t) => t.trim()).filter(Boolean).slice(0, 3)
    : []

  const displayedChars = characters.slice(0, 5)
  const remainingChars = characters.length - 5

  return (
    <article className="bg-genshin-card border border-genshin-border rounded-xl overflow-hidden hover:border-genshin-accent/50 transition-colors">
      {/* Card Header */}
      <div className="p-4 md:p-5 flex gap-4">
        {/* Imagem */}
        <div className="shrink-0 w-[110px] h-[110px] md:w-[130px] md:h-[130px] bg-genshin-bg rounded-lg overflow-hidden flex items-center justify-center">
          {account.cover_image_base64 ? (
            <img
              src={`data:image/jpeg;base64,${account.cover_image_base64}`}
              alt={account.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <span className="text-3xl">📷</span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="min-w-0">
                <span
                  className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide text-white mb-1.5"
                  style={{ backgroundColor: statusColor }}
                >
                  {account.status}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-genshin-text truncate">
                  {account.name}
                </h3>
              </div>
              <div className="text-genshin-success font-extrabold text-xl md:text-2xl shrink-0">
                💰 {account.price || '-'}
              </div>
            </div>

            <p className="text-genshin-muted text-sm mb-2">
              🌐 {account.server || '-'} • ⭐ AR {account.ar || 0} • WL {account.world_level || 0}
            </p>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[11px] font-medium bg-genshin-accent/20 text-purple-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Personagens rápidos */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              {displayedChars.map((char) => (
                <span key={char.character_name} className="text-sm">
                  <span className="mr-1">{ELEMENT_ICONS[char.element || ''] || '✦'}</span>
                  <span className="text-genshin-text font-semibold">{char.character_name}</span>
                  <span className="text-genshin-muted text-xs ml-0.5">{char.constellation || 'C0'}</span>
                </span>
              ))}
              {remainingChars > 0 && (
                <span className="text-genshin-muted text-xs">+{remainingChars}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expand Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-center gap-1 py-2 text-sm text-genshin-muted hover:text-genshin-text bg-genshin-bg/50 hover:bg-genshin-bg transition-colors border-t border-genshin-border"
      >
        {expanded ? (
          <>
            <ChevronUp className="w-4 h-4" /> Menos detalhes
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4" /> Ver detalhes
          </>
        )}
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="p-4 md:p-5 border-t border-genshin-border space-y-5">
          {/* Recursos */}
          <div>
            <h4 className="text-sm font-bold text-genshin-text mb-3">📦 Recursos</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <ResourceBox icon={<Gem className="w-4 h-4 text-blue-400" />} label="Primogems" value={account.primogems || 0} />
              <ResourceBox icon={<Sparkles className="w-4 h-4 text-pink-400" />} label="Limitados" value={account.intertwined_wishes || 0} />
              <ResourceBox icon={<Star className="w-4 h-4 text-yellow-400" />} label="Padrão" value={account.acquaint_wishes || 0} />
              <ResourceBox icon={<Zap className="w-4 h-4 text-purple-400" />} label="Starglitter" value={account.starglitter || 0} />
              <ResourceBox icon={<Moon className="w-4 h-4 text-indigo-400" />} label="Stardust" value={account.stardust || 0} />
              <ResourceBox icon={<Sun className="w-4 h-4 text-orange-400" />} label="Resina" value={account.fragile_resin || 0} />
            </div>
          </div>

          {/* Progresso */}
          <div>
            <h4 className="text-sm font-bold text-genshin-text mb-3">📊 Progresso</h4>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <InfoBox label="🎂 Aniversário" value={account.birthday_set ? 'Sim' : 'Não'} />
              <InfoBox label="🏰 Abismo" value={account.abyss_unlocked ? 'Sim' : 'Não'} />
              <InfoBox label="📈 Andar máx." value={account.abyss_floor || '-'} />
            </div>

            {/* Exploração */}
            <div className="space-y-2">
              {MAP_AREAS.map(([key, label]) => {
                const val = mapProgress[key] || 0
                if (val <= 0) return null
                const color = val >= 80 ? 'bg-genshin-accent' : val >= 50 ? 'bg-genshin-info' : 'bg-genshin-muted'
                return (
                  <div key={key}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-genshin-muted">{label}</span>
                      <span className="text-genshin-text font-medium">{val}%</span>
                    </div>
                    <div className="h-1.5 bg-genshin-bg rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${color}`}
                        style={{ width: `${Math.min(val, 100)}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Armas */}
          {weapons.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-genshin-text mb-2">⚔️ Armas ({weapons.length})</h4>
              <div className="space-y-1.5">
                {weapons.slice(0, 8).map((w) => (
                  <p key={`${w.weapon_name}-${w.character_name}`} className="text-sm text-genshin-muted">
                    • <span className="text-genshin-text font-medium">{w.weapon_name}</span>
                    {' '}({w.character_name || '-'}) <span className="text-genshin-accent">{w.refinement || 'R1'}</span>
                  </p>
                ))}
                {weapons.length > 8 && (
                  <p className="text-sm text-genshin-muted">+{weapons.length - 8} armas</p>
                )}
              </div>
            </div>
          )}

          {/* Observações */}
          {account.extra_info && (
            <div>
              <h4 className="text-sm font-bold text-genshin-text mb-2">📝 Observações</h4>
              <div className="bg-genshin-bg border border-genshin-border rounded-lg p-3 text-sm text-genshin-muted whitespace-pre-wrap">
                {account.extra_info}
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  )
}

function ResourceBox({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="bg-genshin-bg border border-genshin-border rounded-lg p-3">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-xs text-genshin-muted">{label}</span>
      </div>
      <div className="text-lg font-bold text-genshin-text">
        {value.toLocaleString()}
      </div>
    </div>
  )
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-genshin-bg border border-genshin-border rounded-lg p-3 text-center">
      <div className="text-xs text-genshin-muted mb-1">{label}</div>
      <div className="text-lg font-bold text-genshin-text">{value}</div>
    </div>
  )
}
