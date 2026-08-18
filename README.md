# 📰 Web Scraper G1

Aplicação que faz *scraping* de notícias do [G1](https://g1.globo.com/), armazena os resultados em um banco SQLite, gera resumos com IA local (via [Ollama](https://ollama.ai)) e disponibiliza tudo através de uma API REST e de um bot do Telegram.

## ✨ Funcionalidades

- 🔍 **Scraping automatizado** de notícias do G1 por termo e data, usando Puppeteer.
- 💾 **Persistência em SQLite**, com consultas por data, termo ou ambos.
- 🤖 **Resumo com IA local**: gera um resumo das notícias do dia usando o modelo `llama3:8b` via Ollama.
- 📲 **Bot do Telegram** integrado, com comandos para sincronizar, listar e resumir notícias diretamente pelo chat.
- 🌐 **API REST** própria, construída sobre o runtime nativo do Bun (`Bun.serve`), sem framework HTTP externo.

## 🛠️ Tecnologias

- [Bun](https://bun.com) — runtime JavaScript e servidor HTTP
- [Puppeteer](https://pptr.dev) — scraping de páginas dinâmicas
- [SQLite](https://www.sqlite.org) (`sqlite` + `sqlite3`) — persistência dos dados
- [Ollama](https://ollama.ai) — inferência de IA local para os resumos
- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) — integração com o Telegram
- [dotenv](https://github.com/motdotla/dotenv) — variáveis de ambiente

## 📂 Estrutura do projeto

```
Web_Scraper/
├── app.js                     # Ponto de entrada da aplicação
├── src/
│   ├── server.js               # Servidor HTTP (Bun.serve) e inicialização do bot
│   ├── routes/                 # Roteamento das requisições HTTP
│   ├── controllers/            # Lógica de cada endpoint
│   ├── services/                # Scraper, acesso ao Ollama, bot do Telegram
│   ├── database/                # Criação de tabelas e repositório de acesso ao SQLite
│   ├── config/                  # Configuração da conexão com o banco
│   ├── jobs/                    # Agendamento de scraping automático
│   └── utils/                   # Helpers de data e respostas HTTP
└── .env.example                # Modelo de variáveis de ambiente
```

---

## 📋 Pré-requisitos

- [Bun](https://bun.com) (runtime JavaScript)
- [Ollama](https://ollama.ai) (para os resumos com IA local)
- Um bot do Telegram (token gerado pelo [@BotFather](https://t.me/BotFather))

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

Para tornar permanente, adicione os comandos acima ao seu `~/.bashrc`, `~/.zshrc` ou equivalente.

---

## 🤖 Passo 2: Instalar e configurar o Ollama

### 2.1 Instalar

Acesse [ollama.ai](https://ollama.ai) e baixe o instalador para o seu sistema operacional.

### 2.2 Baixar o modelo utilizado

```bash
ollama pull llama3:8b
```

### 2.3 Iniciar o serviço

```bash
ollama serve
```

⚠️ Deixe esse serviço rodando em um terminal separado. A aplicação se conecta a `http://localhost:11434/api/generate`.

---

## 📦 Passo 3: Configurar o bot do Telegram

### 3.1 Criar o bot

Abra o Telegram, procure por [@BotFather](https://t.me/BotFather), crie um novo bot e copie o token gerado (formato `123456:ABC-DEF...`).

### 3.2 Criar o arquivo `.env`

```bash
cp .env.example .env
```

Preencha as variáveis no `.env`:

```env
DB_PATH=noticias.db
PORT=3000
SCRAPER_TERM=tecnologia
TELEGRAM_TOKEN=seu_token_aqui
```

---

## 🚀 Passo 4: Instalar dependências

```bash
bun install
```

---

## ▶️ Passo 5: Executar o sistema

Com o Ollama rodando em outro terminal:

```bash
bun app.js
# ou
bun start
```

A aplicação sobe a API em `http://localhost:3000`, cria as tabelas do banco (se necessário) e inicia o bot do Telegram.

---

## 📍 Endpoints da API

| Método | Rota                          | Descrição                                             |
|--------|-------------------------------|--------------------------------------------------------|
| GET    | `/`                            | Health check da API                                     |
| POST   | `/noticias/obterdata`          | Lista notícias salvas por `data`                        |
| POST   | `/noticias/obtertermo`         | Lista notícias salvas por `termo`                        |
| POST   | `/noticias/obtertermodata`     | Lista notícias salvas por `termo` e `data`                |
| POST   | `/noticias/sincronizar`        | Faz o scraping de um `termo`/`data` e salva no banco      |
| GET    | `/noticias/resumir`            | Gera um resumo (via Ollama) das notícias do dia          |

**Exemplo — sincronizar notícias:**

```bash
curl -X POST http://localhost:3000/noticias/sincronizar \
  -H "Content-Type: application/json" \
  -d '{"termo": "tecnologia", "data": "2026/08/17"}'
```

`data` é opcional; quando omitida, é usada a data de ontem (padrão do scraper).

---

## 💬 Comandos do bot do Telegram

| Comando                          | Descrição                                                          |
|----------------------------------|----------------------------------------------------------------------|
| `/resumo`                         | Envia um resumo (via IA) das notícias do dia                        |
| `/noticias`                       | Lista as últimas notícias salvas no banco                            |
| `/sincronizar <termo> [data]`     | Faz o scraping de um termo (e data opcional, formato `YYYY/MM/DD`) e salva no banco |

---

## 🔧 Troubleshooting

### Ollama não conecta
- Verifique se o Ollama está rodando: `ollama serve` em outro terminal.
- Confirme se a porta `11434` está acessível.
- Verifique o modelo instalado: `ollama list`.

### Bot do Telegram não responde
- Confirme se `TELEGRAM_TOKEN` está correto no `.env`.
- Verifique os logs da aplicação.
- Certifique-se de que a aplicação está rodando (`bun app.js`).

### Erro ao instalar dependências
- Limpe o cache: `bun install --force`.
- Delete `node_modules` e `bun.lock`, depois rode `bun install` novamente.

### Finalizar o uso
- Após terminar, use `killall ollama` para encerrar o serviço do Ollama.
