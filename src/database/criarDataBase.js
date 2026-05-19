import { conectar } from "../config/database.js"

// função de criação de tabela no banco
export async function criar() {
    const db = await conectar();

    try {
        await db.exec(`
            CREATE TABLE IF NOT EXISTS pagina (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                titulo TEXT NOT NULL,
                paragrafo TEXT NOT NULL,
                termo TEXT NOT NULL,
                data DATE
            )
        `);
    } catch (error) {
        console.error("Erro ao criar tabela:", error);
        throw error;
    }
};