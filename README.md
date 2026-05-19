# Web Scraper com Bun
# Como rodar o bun
## 1. Instalar o Bun
```bash
curl -fsSL https://bun.com/install | bash
```

## 2. Configurar as variáveis de ambiente
```bash
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
```
#### Para tornar essa configuração permanente, adicione os comandos acima ao seu arquivo ~/.bashrc, ~/.zshrc ou equivalente.

## 3. Instalar as dependências
```bash
bun install
```

## 4. Executar o scraper
```bash
bun app.js
```

# Como rodar o Bot no Telegram
## 1. Criar o Bot
```bash
- Abra o Telegram e procure por @BotFather
- Crie um novo bot
- Copie o token que ele gera (exemplo: 123456:ABC-DEF...)
```

## 2. Criar .env com o token
```bash
Crie o .env e copie do .env.example e insira o token do bot do telegram
```