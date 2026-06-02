# 🗡️ Genshin Vitrine

Catálogo web de contas de Genshin Impact, construído com **Next.js 14**, **TypeScript**, **Tailwind CSS** e **Supabase**.

> **Arquitetura:** Desktop (Python/Tkinter) → Supabase ← Vitrine Web (Next.js)

---

## 📁 Estrutura do Projeto

```
genshin-vitrine/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Layout raiz (metadata, fontes)
│   │   ├── page.tsx        # Página principal (catálogo)
│   │   └── globals.css     # Estilos globais + Tailwind
│   ├── components/
│   │   ├── Header.tsx          # Cabeçalho do site
│   │   ├── FilterSidebar.tsx   # Filtros laterais
│   │   └── AccountCard.tsx     # Card de cada conta
│   ├── lib/
│   │   └── supabase.ts     # Cliente Supabase + funções de API
│   └── types/
│       └── account.ts      # Tipagens TypeScript
├── public/                 # Assets estáticos
├── .env.example            # Exemplo de variáveis de ambiente
├── .gitignore
├── next.config.js          # Config do Next.js (export estático)
├── tailwind.config.js      # Cores e tema customizado
├── tsconfig.json
└── package.json
```

---

## 🚀 Deploy no Vercel (Passo a Passo)

### 1. Instalar o Node.js

Baixe e instale a versão LTS (Long Term Support):
👉 https://nodejs.org

Verifique a instalação:
```bash
node -v    # Deve mostrar v20.x.x ou superior
npm -v     # Deve mostrar 10.x.x ou superior
```

### 2. Clonar/Preparar o projeto

```bash
# Entre na pasta do projeto
cd genshin-vitrine

# Instalar dependências
npm install
```

### 3. Configurar variáveis de ambiente

```bash
# Copie o arquivo de exemplo
cp .env.example .env.local

# Edite .env.local com seus dados do Supabase:
NEXT_PUBLIC_SUPABASE_URL=https://soivcovmfhocswsjvfpb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_aqui
```

> ⚠️ **NUNCA** commit o arquivo `.env.local`! Ele já está no `.gitignore`.

### 4. Testar localmente

```bash
npm run dev
```

Abra http://localhost:3000 no navegador.

### 5. Subir no GitHub

```bash
git init
git add .
git commit -m "Primeiro commit"
git branch -M main

# Crie um repositório no GitHub e rode:
git remote add origin https://github.com/SEU_USUARIO/genshin-vitrine.git
git push -u origin main
```

### 6. Deploy na Vercel

1. Acesse https://vercel.com e faça login com sua conta do GitHub
2. Clique em **"Add New Project"**
3. Importe o repositório `genshin-vitrine`
4. Em **"Environment Variables"**, adicione:
   - `NEXT_PUBLIC_SUPABASE_URL` = sua URL do Supabase
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = sua chave anon
5. Clique em **"Deploy"**

Pronto! Sua vitrine estará online em `https://genshin-vitrine.vercel.app` (ou similar).

---

## 🔧 Comandos Úteis

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia servidor de desenvolvimento (localhost:3000) |
| `npm run build` | Gera build de produção (pasta `out/`) |
| `npm run start` | Inicia servidor de produção local |

---

## 🎨 Customização

### Cores
Edite `tailwind.config.js` na seção `colors` para mudar o tema.

### Favicon
Substitua `public/favicon.ico` (ou adicione ícones no `layout.tsx`).

### Domínio próprio
Na Vercel: **Project Settings → Domains** → adicione seu domínio.

---

## 🔒 Segurança

- A chave `anon` do Supabase é **pública por design** — ela só pode ler dados que as RLS (Row Level Security) permitirem
- Certifique-se de que a tabela `public_accounts` no Supabase tenha:
  - RLS **ativada**
  - Policy de `SELECT` liberada para `anon`
  - **NENHUMA** policy de `INSERT/UPDATE/DELETE` para `anon`
- O desktop deve usar a **service role key** (ou uma chave separada) para escrever

---

## 📝 Licença

Projeto pessoal. Uso livre para fins não-comerciais.
