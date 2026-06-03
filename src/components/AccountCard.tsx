"use client"

import { useState } from 'react'
import { ChevronDown, ChevronUp, Gem, Sparkles, Star, Zap, Moon, Sun, MapPin, Sword, Shield } from 'lucide-react'
import { Account, Character, Weapon } from '@/types/account'
import { parseJsonField, parseJsonDict } from '@/lib/supabase'

interface AccountCardProps {
  account: Account
  index: number
}

const ELEMENT_ICONS: Record<string, string> = {
  Pyro: '🔥', Hydro: '💧', Electro: '⚡', Cryo: '❄️',
  Geo: '🟡', Anemo: '🌪️', Dendro: '🌿',
}

const ELEMENT_COLORS: Record<string, string> = {
  Pyro: '#DC2626', Hydro: '#0284C7', Electro: '#7C3AED',
  Cryo: '#38BDF8', Geo: '#D97706', Anemo: '#0D9488', Dendro: '#16A34A',
}

const STATUS_COLORS: Record<string, { bg: string; text: string; glow: string }> = {
  Disponível: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', glow: 'shadow-emerald-500/20' },
  Reservada: { bg: 'bg-amber-500/20', text: 'text-amber-400', glow: 'shadow-amber-500/20' },
  Vendida: { bg: 'bg-slate-500/20', text: 'text-slate-400', glow: 'shadow-slate-500/20' },
  Pausada: { bg: 'bg-purple-500/20', text: 'text-purple-400', glow: 'shadow-purple-500/20' },
  Farmando: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', glow: 'shadow-cyan-500/20' },
  Revisar: { bg: 'bg-red-500/20', text: 'text-red-400', glow: 'shadow-red-500/20' },
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

export default function AccountCard({ account, index }: AccountCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const characters = parseJsonField<Character[]>(account.characters_json)
  const weapons = parseJsonField<Weapon[]>(account.weapons_json)
  const mapProgress = parseJsonDict(account.map_progress_json)

  const statusStyle = STATUS_COLORS[account.status] || STATUS_COLORS['Disponível']
  const tags = account.tags
    ? account.tags.split(',').map((t) => t.trim()).filter(Boolean).slice(0, 4)
    : []

  const displayedChars = characters.slice(0, 6)
  const remainingChars = characters.length - 6

  const animationDelay = Math.min(index * 100, 500)

  return (
    <article
      className="group relative animate-fade-in-up"
      style={{ animationDelay: `${animationDelay}ms`, opacity: 0 }}
    >
      {/* Glow effect on hover */}
      <div className={`absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm ${statusStyle.glow}`} />

      <div className="relative glass rounded-xl overflow-hidden card-lift">
        {/* Card Header */}
        <div className="p-4 md:p-5 flex gap-4">
          {/* Image */}
          <div className="shrink-0 w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-lg overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 relative">
            {account.cover_image_base64 ? (
              <>
                {!imageLoaded && (
                  <div className="absolute inset-0 shimmer" />
                )}
                <img
                  src={`data:image/jpeg;base64,${account.cover_image_base64}`}
                  alt={account.name}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  loading="lazy"
                  onLoad={() => setImageLoaded(true)}
                />
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Shield className="w-10 h-10 text-slate-600" />
              </div>
            )}

            {/* Character count badge */}
            {characters.length > 0 && (
              <div className="absolute bottom-1 right-1 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-[10px] font-bold text-white">
                {characters.length} chars
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="min-w-0">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusStyle.bg} ${statusStyle.text}`}>
                    {account.status}
                  </span>
                </div>
                <div className="text-emerald-400 font-black text-lg md:text-xl shrink-0 tracking-tight">
                  {account.price || '-'}
                </div>
              </div>

              <h3 className="text-lg md:text-xl font-bold text-white truncate mb-1 group-hover:text-purple-300 transition-colors">
                {account.name}
              </h3>

              <p className="text-slate-400 text-sm mb-2">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {account.server || '-'}
                </span>
                <span className="mx-2 text-slate-600">•</span>
                <span>AR {account.ar || 0}</span>
                <span className="mx-2 text-slate-600">•</span>
                <span>WL {account.world_level || 0}</span>
              </p>

              {/* Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-purple-500/10 text-purple-300 border border-purple-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Quick resources */}
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Gem className="w-3.5 h-3.5 text-blue-400" />
                {(account.primogems || 0).toLocaleString()}
              </span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                {account.intertwined_wishes || 0}
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-yellow-400" />
                {account.acquaint_wishes || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Characters strip */}
        {displayedChars.length > 0 && (
          <div className="px-4 md:px-5 pb-3">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
              {displayedChars.map((char) => (
                <span key={char.character_name} className="inline-flex items-center gap-1 text-sm">
                  <span className="text-base">{ELEMENT_ICONS[char.element || ''] || '✦'}</span>
                  <span className="text-slate-300 font-medium">{char.character_name}</span>
                  <span className="text-slate-500 text-xs">{char.constellation || 'C0'}</span>
                </span>
              ))}
              {remainingChars > 0 && (
                <span className="text-slate-500 text-xs bg-slate-800/50 px-2 py-0.5 rounded-full">
                  +{remainingChars}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Expand Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 text-sm text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition-all border-t border-white/5"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4" /> Ocultar detalhes
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" /> Ver detalhes completos
            </>
          )}
        </button>

        {/* Expanded Content */}
        {expanded && (
          <div className="p-4 md:p-5 border-t border-white/5 space-y-5 animate-fade-in">
            {/* Resources Grid */}
            <div>
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Gem className="w-4 h-4 text-purple-400" />
                Recursos
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
                <ResourceBox icon={<Gem className="w-4 h-4 text-blue-400" />} label="Primogems" value={account.primogems || 0} />
                <ResourceBox icon={<Sparkles className="w-4 h-4 text-pink-400" />} label="Giros Limitados" value={account.intertwined_wishes || 0} />
                <ResourceBox icon={<Star className="w-4 h-4 text-yellow-400" />} label="Giros Padrão" value={account.acquaint_wishes || 0} />
                <ResourceBox icon={<Zap className="w-4 h-4 text-purple-400" />} label="Starglitter" value={account.starglitter || 0} />
                <ResourceBox icon={<Moon className="w-4 h-4 text-indigo-400" />} label="Stardust" value={account.stardust || 0} />
                <ResourceBox icon={<Sun className="w-4 h-4 text-orange-400" />} label="Resina" value={account.fragile_resin || 0} />
              </div>
            </div>

            {/* Progress */}
            <div>
              <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                Progresso
              </h4>
              <div className="grid grid-cols-3 gap-2.5 mb-4">
                <InfoBox label="Aniversário" value={account.birthday_set ? 'Sim' : 'Não'} icon="🎂" />
                <InfoBox label="Abismo" value={account.abyss_unlocked ? 'Sim' : 'Não'} icon="🏰" />
                <InfoBox label="Andar Máx." value={account.abyss_floor || '-'} icon="📈" />
              </div>

              {/* Map exploration */}
              <div className="space-y-2.5">
                {MAP_AREAS.map(([key, label]) => {
                  const val = mapProgress[key] || 0
                  if (val <= 0) return null
                  const color = val >= 80 ? 'from-purple-500 to-purple-400' : val >= 50 ? 'from-cyan-500 to-cyan-400' : 'from-slate-600 to-slate-500'
                  return (
                    <div key={key}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-400">{label}</span>
                        <span className="text-white font-semibold">{val}%</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000`}
                          style={{ width: `${Math.min(val, 100)}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Weapons */}
            {weapons.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <Sword className="w-4 h-4 text-amber-400" />
                  Armas ({weapons.length})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {weapons.slice(0, 10).map((w) => (
                    <div key={`${w.weapon_name}-${w.character_name}`} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 text-sm">
                      <Sword className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="text-slate-300 font-medium truncate">{w.weapon_name}</span>
                      <span className="text-slate-500 text-xs shrink-0">({w.character_name || '-'})</span>
                      <span className="text-purple-400 text-xs font-bold ml-auto shrink-0">{w.refinement || 'R1'}</span>
                    </div>
                  ))}
                  {weapons.length > 10 && (
                    <div className="text-center text-slate-500 text-sm py-2">
                      +{weapons.length - 10} armas
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Notes */}
            {account.extra_info && (
              <div>
                <h4 className="text-sm font-bold text-white mb-3">📝 Observações</h4>
                <div className="bg-white/5 border border-white/5 rounded-lg p-4 text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {account.extra_info}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

function ResourceBox({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="bg-white/5 border border-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors">
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-xs text-slate-400">{label}</span>
      </div>
      <div className="text-lg font-bold text-white">
        {value.toLocaleString()}
      </div>
    </div>
  )
}

function InfoBox({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="bg-white/5 border border-white/5 rounded-lg p-3 text-center">
      <div className="text-lg mb-0.5">{icon}</div>
      <div className="text-xs text-slate-400 mb-0.5">{label}</div>
      <div className="text-base font-bold text-white">{value}</div>
    </div>
  )
}
