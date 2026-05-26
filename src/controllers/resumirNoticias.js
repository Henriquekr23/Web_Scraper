import { obterNoticiasTermoData } from "../services/obterService";
import { obterDataScraper } from "../utils/date";
import { ollamaResumirNoticias } from "../services/ollama";
import { httpResponse } from "../utils/response";

export async function resumir() {
    try{
        const data = await obterDataScraper();
        const termo = "tecnologia";

        const listaNoticias = await obterNoticiasTermoData(termo, data);

        const resumo = await ollamaResumirNoticias(listaNoticias);

        // TESTE
        console.log(resumo)

        return httpResponse.success({
            sucesso: true,
            resumo: resumo,
            data: data
        });
    } catch(error) {
        console.error("Erro ao resumir notícias: ", error);
        return httpResponse.error(error.message, 500);
    }
}