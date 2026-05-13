# Web Scraper com Bun
## 1. Instalar o Bun
```bash
curl -fsSL https://bun.com/install | bash

2. Configurar as variáveis de ambiente

export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

Para tornar essa configuração permanente, adicione os comandos acima ao seu arquivo ~/.bashrc, ~/.zshrc ou equivalente.

3. Instalar as dependências

bun install

4. Executar o scraper

bun run scraper.js