import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.TELEGRAM_TOKEN;

const hoje = new Date();
const ano = hoje.getFullYear();
const mes = String(hoje.getMonth() + 1).padStart(2, "0");
const dia = String(hoje.getDate()).padStart(2, "0");

const dataHoje = `${ano}/${mes}/${dia}`;

export function iniciarBot() {
    if (!token) {
        console.error("[BOT] Token do Telegram não encontrado no .env");
        return;
    }
    
    const bot = new TelegramBot(token, { polling: true });

    console.log("[BOT] Bot do Telegram iniciado com sucesso!");

    // Escuta o comando /noticias
    bot.onText(/\/noticias/, async (msg) => {
        const chatId = msg.chat.id;
        
        bot.sendMessage(chatId, "Buscando as notícias mais recentes... 🔍");

        try {
            const response = await fetch("http://localhost:3000/noticias/obterdata", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data: dataHoje })
            });

            const dataResponse = await response.json();
            const noticias = dataResponse.dados;

            if (!noticias || noticias.length === 0) {
                bot.sendMessage(chatId, "Não encontrei nenhuma notícia no banco para a data configurada. 😢");
                return;
            }

            const ultimasNoticias = noticias.slice(0, 5);
            
            let mensagem = `📰 *Principais Notícias:*\n\n`;
            
            ultimasNoticias.forEach((noticia, index) => {
                mensagem += `*${index + 1}. ${noticia.titulo}*\n`;
                mensagem += `${noticia.paragrafo}\n\n`;
            });

            bot.sendMessage(chatId, mensagem, { parse_mode: 'Markdown' });

        } catch (error) {
            console.error("[BOT] Erro ao buscar notícias:", error);
            bot.sendMessage(chatId, "Ocorreu um erro ao buscar as notícias no sistema.");
        }
    });

    // Escuta o comando /sincronizar com parâmetros: /sincronizar termo [data]
    bot.onText(/\/sincronizar(?:\s+(.+))?/, async (msg, match) => {
        const chatId = msg.chat.id;
        const parametros = match[1] ? match[1].trim().split(/\s+/) : [];

        if (parametros.length === 0) {
            bot.sendMessage(
                chatId,
                "❌ Use: /sincronizar <termo> [data]\n\nExemplos:\n• /sincronizar tecnologia\n• /sincronizar economia 2026/05/22"
            );
            return;
        }

        const termo = parametros[0];
        const data = parametros[1] || dataHoje;

        // Validar formato da data se fornecida
        if (parametros[1]) {
            const regexData = /^\d{4}\/\d{2}\/\d{2}$/;
            if (!regexData.test(data)) {
                bot.sendMessage(
                    chatId,
                    `❌ Formato de data inválido!\nUse: YYYY/MM/DD\nExemplo: 2026/05/22`
                );
                return;
            }
        }

        bot.sendMessage(chatId, `🔄 Sincronizando notícias sobre "${termo}" para ${data}...`);

        try {
            const response = await fetch("http://localhost:3000/noticias/sincronizar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ termo, data })
            });

            const dataResponse = await response.json();

            if (!dataResponse.sucesso) {
                bot.sendMessage(chatId, `❌ Erro: ${dataResponse.mensagem || "Erro desconhecido"}`);
                return;
            }

            const noticias = dataResponse.dados;
            const total = dataResponse.total;

            if (total === 0) {
                bot.sendMessage(
                    chatId,
                    `📭 Nenhuma notícia encontrada sobre "${termo}" para a data ${data}.`
                );
                return;
            }

            let mensagem = `✅ *${total} notícia(s) sincronizada(s)*\n`;
            mensagem += `📌 Termo: ${termo}\n`;
            mensagem += `📅 Data: ${data}\n\n`;

            const ultimasNoticias = noticias.slice(0, 5);
            ultimasNoticias.forEach((noticia, index) => {
                mensagem += `*${index + 1}. ${noticia.titulo}*\n`;
                mensagem += `${noticia.paragrafo}\n\n`;
            });

            bot.sendMessage(chatId, mensagem, { parse_mode: 'Markdown' });

        } catch (error) {
            console.error("[BOT] Erro ao sincronizar notícias:", error);
            bot.sendMessage(chatId, "❌ Ocorreu um erro ao sincronizar as notícias no sistema.");
        }
    });
}