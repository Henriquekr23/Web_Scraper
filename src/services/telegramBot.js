import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { obterNoticiasData } from "./obterService.js";

dotenv.config();

const token = process.env.TELEGRAM_TOKEN;

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
            const noticias = await obterNoticiasData();

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
}