import sql from "sqlite3";
import { open } from "sqlite";
import dotenv from "dotenv";

dotenv.config();

// função de conexão com o banco
export async function conectar() {
    return open({
        filename: process.env.DB_PATH,
        driver: sql.Database
    });
}

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
}

// função de inserir dados
export async function inserir(titulo, paragrafo) {
    const db = await conectar();
    const existe = await comparar(titulo);

    try {
        if(!existe) return `\nNotícia ${titulo} já inserida no banco`;

        await db.run(
            "INSERT INTO pagina (titulo, paragrafo) VALUES (?, ?)",
            titulo, paragrafo
        );

        return `\nNotícia ${titulo} inserida no banco`; 
    } finally {
        await db.close();
    }   
}

// Função de comparar se já existe notícia em banco
export async function comparar(titulo) {
    const db = await conectar();

    try {
        const busca = await db.get(
            "SELECT titulo FROM pagina WHERE titulo = ?",
            titulo
        );

        return !busca;
    } finally {
        await db.close();
    }
}