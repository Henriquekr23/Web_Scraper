import { conectar } from "../config/database.js";

// Função de comparar se já existe notícia em banco
const comparar = async (titulo) => {
    const db = await conectar();

    try {
        const busca = await db.get(
            "SELECT titulo FROM pagina WHERE titulo = ?",
            titulo
        );

        return !busca;
    } catch (error) {
        throw error;
    }
};

// função de inserir dados
export async function inserir(titulo, paragrafo, termo, data) {
    const db = await conectar();
    const naoExiste = await comparar(titulo);

    try {
        if(!naoExiste) return `\nNotícia "${titulo}" já existe no banco`;

        await db.run(
            "INSERT INTO pagina (titulo, paragrafo, termo, data) VALUES (?, ?, ?, ?)",
            titulo, paragrafo, termo, data
        );

        return `\nNotícia "${titulo}" inserida com sucesso`;
    } catch (error) {
        throw error;
    }
}

export async function obterPorData(data) {
    const db = await conectar();

    try {
        const busca = await db.all(
            "SELECT titulo, paragrafo, termo FROM pagina WHERE data = ?",
            data
        );

        return busca;
    } catch (error) {
        throw error;
    }
}

export async function obterPorTermo(termo) {
    const db = await conectar();

    try {
        const busca = await db.all(
            "SELECT titulo, paragrafo FROM pagina WHERE termo = ?",
            termo
        );

        return busca;
    } catch (error) {
        throw error;
    }
}

export async function obterPorTermoData(termo, data) {
    const db = await conectar();

    try {
        const busca = await db.all(
            "SELECT titulo, paragrafo FROM pagina WHERE termo = ? AND data = ?",
            termo, data
        );

        return busca;
    } catch (error) {
        throw error;
    }
}