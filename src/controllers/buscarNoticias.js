import { obterNoticiasData, obterNoticiasTermo, obterNoticiasTermoData } from "../services/obterService.js";
import { obterDataScraper } from "../utils/date.js";
import { httpResponse } from "../utils/response.js";

export async function buscarNoticiasData(req, url) {
  try {
    const body = await req.json();
    const { data } = body; 

    if(!data) {
      await httpResponse.error("Erro: Falta de 'data' na requisição");
    }

    const noticias = await obterNoticiasData(data);

    return httpResponse.success({
      sucesso: true,
      total: noticias.length,
      dados: noticias,
      data: data
    });
  } catch (error) {
    console.error("Erro ao buscar notícias:", error);
    return httpResponse.error(error.message, 500);
  }
}

export async function buscarNoticiasTermo(req, url) {
  try {
    const body = await req.json();
    const { termo } = body;

    if(!termo) {
      await httpResponse.error("Erro: Falta de 'termo' na requisição");
    }

    const noticias = await obterNoticiasTermo(termo);
    const data = await obterDataScraper();

    return httpResponse.success({
      sucesso: true,
      total: noticias.length,
      dados: noticias,
      data: data
    });
  } catch (error) {
    console.error("Erro ao buscar notícias:", error);
    return httpResponse.error(error.message, 500);
  }
}

export async function buscarNoticiasTermoData(req, url) {
  try {
    const body = await req.json();
    const { termo, data } = body;
    
    if(!termo || !data) {
      await httpResponse.error("Erro: Falta de 'termo' ou 'data' na requisição");
    }

    const noticias = await obterNoticiasTermoData(termo, data);

    return httpResponse.success({
      sucesso: true,
      termo,
      data,
      total: noticias.length,
      dados: noticias
    })
  } catch (error) {
    console.error("Erro ao buscar notícias:", error);
    return httpResponse.error(error.message, 500);
  }
  
}