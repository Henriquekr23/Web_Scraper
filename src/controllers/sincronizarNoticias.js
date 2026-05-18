import { inserirNoticias } from "../services/inserirService.js";
import { dataHoje } from "../services/obterService.js";
import { httpResponse } from "../utils/response.js";
import { scraper } from "../services/scraperService.js";

export async function sincronizarNoticias(req, url) {
  try {
    const termo = "tecnologia";
    const noticias = await scraper(termo);
    const data = await dataHoje();

    await inserirNoticias(noticias);

    return httpResponse.success({
      sucesso: true,
      termo,
      total: noticias.length,
      data: data,
      dados: noticias
    });
  } catch (error) {
    console.error("Erro ao sincronizar notícias:", error);
    return httpResponse.error(error.message, 500);
  }
}