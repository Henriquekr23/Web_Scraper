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
            titulo TEXT,
            paragrafo TEXT
        )
    `);

    await db.close();
}

// função de inserir dados
export async function inserir(titulo, paragrafo, data) {
    const db = await conectar();

    await db.run(
        "INSERT INTO pagina (titulo, paragrafo) VALUES (?, ?)",
        titulo, paragrafo
    );

    await db.close();
}

// Função de comparar se já existe notícia em banco
// export async function comparar(titulo) {
//     const db = await conectar();

//     const comparar = await db.run(
//         "SELECT titulo FROM pagina WHERE titulo LIKE ?",
//         titulo
//     );

//     if(comparar != null) return(comparar);

//     await db.close();
// }