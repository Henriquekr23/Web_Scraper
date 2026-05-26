export async function ollamaResumirNoticias(listaNoticias) {

    const noticiasFormatadas = listaNoticias
        .map((noticia, index) => {
            return `
                Notícia ${index + 1}:
                Título: ${noticia.titulo}
                Parágrafo: ${noticia.paragrafo}
            `;
        })
        .join("\n-------------------\n");

    const resposta = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "llama3:8b",
            stream: false,
            prompt: `
                Você é um jornalista especializado em resumir notícias.

                Leia TODAS as notícias abaixo e gere um resumo geral do conjunto das notícias, em parágrafo único e curto para uma mensagem de resumo

                NOTÍCIAS:

                ${noticiasFormatadas}

                RESUMO GERAL:
                `
        })
    });

    const data = await resposta.json();

    return data.response.trim();
}