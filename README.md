# Web Scraper com Bun

## 📋 Pré-requisitos

Antes de inicializar o sistema, certifique-se de ter instalado:
- **Bun** (runtime JavaScript)
- **Ollama** (para IA local)

---

## ⚡ Passo 1: Instalar o Bun

```bash
curl -fsSL https://bun.com/install | bash
```

### Configurar as variáveis de ambiente do Bun
```bash
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"
```

**Para tornar permanente**, adicione os comandos acima ao seu arquivo `~/.bashrc`, `~/.zshrc` ou equivalente.

---

## 🤖 Passo 2: Instalar e Configurar Ollama

### 2.1 Baixar e Instalar Ollama

- **macOS/Linux**: Acesse [ollama.ai](https://ollama.ai) e baixe o instalador
- **Windows**: Acesse [ollama.ai](https://ollama.ai) e baixe o instalador

### 2.2 Puxar o modelo necessário

Após instalar Ollama, puxe o modelo que será usado para resumir notícias:

```bash
ollama pull llama3:8b
```

### 2.3 Iniciar o serviço Ollama

```bash
ollama serve
```

⚠️ **Importante**: Deixe este serviço rodando em um terminal separado. O aplicativo se conectará a `http://localhost:11434/api/generate`

---

## 📦 Passo 3: Configurar o Bot do Telegram

### 3.1 Criar o Bot

```bash
- Abra o Telegram e procure por @BotFather
- Crie um novo bot
- Copie o token que ele gera (exemplo: 123456:ABC-DEF...)
```

### 3.2 Criar arquivo .env

Crie um arquivo `.env` na raiz do projeto (você pode copiar do `.env.example`):

```bash
cp .env.example .env
```

Adicione o token do bot do Telegram no arquivo `.env`:

```env
TELEGRAM_BOT_TOKEN=seu_token_aqui
```

---

## 🚀 Passo 4: Instalar Dependências

```bash
bun install
```

---

## ▶️ Passo 5: Executar o Sistema

Com Ollama rodando em outro terminal, inicie a aplicação:

```bash
bun app.js
```

A aplicação estará rodando e pronta para:
- Fazer scraping de notícias
- Comunicar com o bot do Telegram
- Resumir notícias usando IA (Ollama)

---

## 📍 Endpoints Disponíveis

### Scraper
- `GET /api/noticias` - Obtém todas as notícias
- `POST /api/scraper` - Inicia o scraping de notícias
- `POST /api/sincronizar` - Sincroniza notícias por data

### Resumo de Notícias
- `POST /api/resumir` - Resumir um conjunto de notícias usando Ollama

### Bot Telegram
- Comandos disponíveis:
  - `/resumo` - Entrega um resumo das notícias do dia
  - `/sincronizar [termo] [data]` - Sincroniza notícias no banco de acordo com o termo e data estabelecidos
  - `/noticias` - Retorna as notícias salvas no banco

---

## 🔧 Troubleshooting

### Ollama não conecta
- Verifique se Ollama está rodando: `ollama serve` em outro terminal
- Confirme se a porta 11434 está acessível
- Verifique o modelo: `ollama list`

### Bot do Telegram não responde
- Confirme se o token está correto no arquivo `.env`
- Verifique os logs da aplicação
- Certifique-se de que a aplicação está rodando (`bun app.js`)

### Erro ao instalar dependências
- Limpe o cache: `bun install --force`
- Delete a pasta `node_modules` e `bun.lock`, depois rode `bun install` novamente

### Finalização
- Após o termino do uso do sistema use o comando `killall ollama` para parar de rodar o Ollama