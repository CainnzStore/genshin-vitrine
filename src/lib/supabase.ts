import { createClient } from '@supabase/supabase-js'
import { Account } from '@/types/account'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
})

export async function fetchAccounts(): Promise<Account[]> {
  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase não configurado')
    return []
  }

  const { data, error } = await supabase
    .from('public_accounts')
    .select('*')
    .eq('is_visible', true)
    .order('updated_at', { ascending: false })

  if (error) {
    console.error('Erro ao buscar contas:', error)
    return []
  }

  return (data || []) as Account[]
}

export function parseJsonField<T>(data: unknown): T {
  if (!data) return [] as unknown as T
  if (typeof data === 'string') {
    try {
      return JSON.parse(data) as T
    } catch {
      return [] as unknown as T
    }
  }
  return data as T
}

export function parseJsonDict(data: unknown): Record<string, number> {
  if (!data) return {}
  if (typeof data === 'string') {
    try {
      return JSON.parse(data) as Record<string, number>
    } catch {
      return {}
    }
  }
  return (data as Record<string, number>) || {}
}
