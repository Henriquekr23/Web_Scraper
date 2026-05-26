import { obterPorData, obterPorTermo, obterPorTermoData } from "../database/repositorioDataBase.js";
import { obterDataScraper } from "../utils/date.js";

export async function obterNoticiasData(data) {
    const noticias = await obterPorData(data);

    return noticias;
}

export async function obterNoticiasTermo(termo) {
    const data = await obterDataScraper();
    const noticias = await obterPorTermo(data, termo);

    return noticias;
}

export async function obterNoticiasTermoData(termo, data) {
    const noticias = await obterPorTermoData(termo, data);

    return noticias;
}