import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

console.log("Testando conexão com o Telegram...");

bot.on('message', (msg) => {
    console.log("Mensagem recebida do Telegram:", msg.text);
    bot.sendMessage(msg.chat.id, "Bot está online e respondendo!");
});