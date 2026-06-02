-- ==========================================================
-- SQL: Criação da tabela public_accounts no Supabase
-- Execute isso no SQL Editor do seu projeto Supabase
-- ==========================================================

-- 1. Criar a tabela
CREATE TABLE IF NOT EXISTS public_accounts (
    id SERIAL PRIMARY KEY,
    local_id INTEGER NOT NULL UNIQUE,
    name TEXT NOT NULL,
    uid TEXT,
    server TEXT,
    status TEXT DEFAULT 'Disponível',
    ar INTEGER DEFAULT 0,
    world_level INTEGER DEFAULT 0,
    primogems INTEGER DEFAULT 0,
    intertwined_wishes INTEGER DEFAULT 0,
    acquaint_wishes INTEGER DEFAULT 0,
    starglitter INTEGER DEFAULT 0,
    stardust INTEGER DEFAULT 0,
    fragile_resin INTEGER DEFAULT 0,
    price TEXT,
    tags TEXT,
    abyss_floor TEXT,
    birthday_set BOOLEAN DEFAULT FALSE,
    abyss_unlocked BOOLEAN DEFAULT FALSE,
    extra_info TEXT,
    characters_json JSONB DEFAULT '[]'::jsonb,
    weapons_json JSONB DEFAULT '[]'::jsonb,
    map_progress_json JSONB DEFAULT '{}'::jsonb,
    has_cover BOOLEAN DEFAULT FALSE,
    cover_image_base64 TEXT,
    is_visible BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Índices para performance
CREATE INDEX IF NOT EXISTS idx_public_accounts_local_id ON public_accounts(local_id);
CREATE INDEX IF NOT EXISTS idx_public_accounts_status ON public_accounts(status);
CREATE INDEX IF NOT EXISTS idx_public_accounts_visible ON public_accounts(is_visible);
CREATE INDEX IF NOT EXISTS idx_public_accounts_updated ON public_accounts(updated_at DESC);

-- 3. Habilitar RLS (Row Level Security)
ALTER TABLE public_accounts ENABLE ROW LEVEL SECURITY;

-- 4. Política: Permitir SELECT público (para a vitrine web)
-- Qualquer pessoa pode ver contas visíveis
CREATE POLICY "Allow public read visible accounts"
    ON public_accounts
    FOR SELECT
    USING (is_visible = TRUE);

-- 5. Política: Permitir INSERT/UPDATE/DELETE apenas com service role
-- O desktop usa a service_role key para sincronizar
-- Isso bloqueia qualquer tentativa de modificação via anon key
CREATE POLICY "Allow service role full access"
    ON public_accounts
    FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');

-- 6. Trigger para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_public_accounts_updated_at ON public_accounts;
CREATE TRIGGER update_public_accounts_updated_at
    BEFORE UPDATE ON public_accounts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ==========================================================
-- IMPORTANTE: Configurar a service_role key no Desktop
-- ==========================================================
-- A chave "anon" (usada no site) SÓ pode ler.
-- A chave "service_role" (usada no desktop) pode tudo.
--
-- No seu sync_manager.py do desktop, troque a anon key
-- pela service_role key para INSERT/UPDATE/DELETE funcionar.
--
-- Painel Supabase → Project Settings → API → service_role key
