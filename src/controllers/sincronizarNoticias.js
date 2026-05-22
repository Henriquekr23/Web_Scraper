import { inserirNoticias } from "../services/inserirService.js";
import { httpResponse } from "../utils/response.js";
import { scraper } from "../services/scraperService.js";

const validarDataFormato = (data) => {
  const regex = /^\d{4}\/\d{2}\/\d{2}$/;
  if (!regex.test(data)) {
    return false;
  }

  const [ano, mes, dia] = data.split('/').map(Number);
  const dataObj = new Date(ano, mes - 1, dia);

  return dataObj.getFullYear() === ano &&
         dataObj.getMonth() === mes - 1 &&
         dataObj.getDate() === dia;
};

const obterDataHoje = () => {
  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");

  return `${ano}/${mes}/${dia}`;
};

export async function sincronizarNoticias(req, url) {
  try {
    const body = await req.json();
    let { termo, data } = body;

    if(!termo) {
      return httpResponse.error("Erro falta de 'termo' na requisição");
    }

    if(!data) {
      data = obterDataHoje();
    } else if (!validarDataFormato(data)) {
      return httpResponse.error("Data inválida. Use o formato YYYY/MM/DD");
    }

    const noticias = await scraper(termo, data);
    await inserirNoticias(noticias);

    return httpResponse.success({
      sucesso: true,
      termo,
      data,
      total: noticias.length,
      dados: noticias
    });
  } catch (error) {
    console.error("Erro ao sincronizar notícias:", error);
    return httpResponse.error(error.message, 500);
  }
}