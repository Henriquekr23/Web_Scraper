import { conectar } from "../config/database.js";

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