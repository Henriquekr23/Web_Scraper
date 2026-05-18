import { dataHoje, obterNoticiasData } from "../services/obterService.js";
import { httpResponse } from "../utils/response.js";

export async function buscarNoticiasData(req, url) {
  try {
    const noticias = await obterNoticiasData();
    const data = await dataHoje();

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

export async function buscarNoticiasTermo(params) {
  try {
    const noticias = await obetrN();
    const data = await dataHoje();

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