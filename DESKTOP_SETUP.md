# 🔧 Guia: Adaptar o Desktop para usar Service Role Key

## O problema

Atualmente seu `sync_manager.py` usa a **anon key** para escrever no Supabase.
Com as RLS ativadas, a anon key só pode **ler** dados (SELECT).

Para o desktop conseguir **inserir, atualizar e deletar** contas, ele precisa usar a **service_role key**.

## Passo 1: Pegar a Service Role Key

1. Vá no painel do Supabase: https://app.supabase.com
2. Selecione seu projeto
3. Vá em **Project Settings → API**
4. Copie a chave **service_role** (não a anon!)

> ⚠️ **A service_role key é SECRETA.** Nunca a exponha no frontend/web.
> Ela só deve estar no seu app desktop local.

## Passo 2: Atualizar o sync_config.json do Desktop

Edite o arquivo `~/.genshin_account_notes/sync_config.json`:

```json
{
    "supabase_url": "https://soivcovmfhocswsjvfpb.supabase.co",
    "supabase_key": "sua_service_role_key_aqui"
}
```

## Passo 3: Atualizar o sync_manager.py (opcional, mas recomendado)

Se quiser maior segurança, atualize o `test_connection` para verificar se está usando service_role:

```python
def test_connection(self):
    if not self.enabled:
        return False, "Sync não configurado."
    try:
        # Verifica se consegue acessar a tabela (service_role tem acesso total)
        url = f"{self.supabase_url}/rest/v1/public_accounts?select=count"
        status, body, err = self._http_request("GET", url, timeout=10)
        if err:
            return False, err
        if status == 200:
            return True, "Conexão com Supabase OK!"
        if status == 401:
            return False, "Erro 401: Chave inválida. Use a service_role key."
        return False, f"HTTP {status}"
    except Exception as e:
        return False, f"Falha na conexão: {e}"
```

## Passo 4: Testar

1. Salve uma conta no desktop
2. Verifique se aparece no Supabase (Table Editor → public_accounts)
3. Acesse a vitrine web e veja se a conta aparece

## Resumo das chaves

| Onde | Qual chave usar | Por quê |
|---|---|---|
| **Desktop (Python)** | `service_role` | Precisa escrever no banco |
| **Vitrine Web (Next.js)** | `anon` | Só precisa ler dados públicos |

## Segurança

- ✅ A `service_role` fica só no seu computador (desktop)
- ✅ A `anon` é pública e só lê dados visíveis
- ✅ RLS bloqueia qualquer tentativa de escrita via anon
- ✅ Se alguém roubar sua anon key, só consegue ver o que já é público
