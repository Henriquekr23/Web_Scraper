# Web Scraper com Bun
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
bun run scraper.js
```