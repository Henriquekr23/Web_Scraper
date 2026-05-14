import sql from "sqlite3";
import { conectar } from "../config/database.js"

// função de criação de tabela no banco
export async function criar() {
    const db = await conectar();

    await db.exec(`
        CREATE TABLE IF NOT EXISTS pagina (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo TEXT NOT NULL,
            paragrafo TEXT NOT NULL,
            data DATE DEFAULT CURRENT_DATE
        )
    `);

    await db.close();
};