import { buscarNoticiasData, buscarNoticiasTermo, buscarNoticiasTermoData } from "../controllers/buscarNoticias.js";
import { sincronizarNoticias } from "../controllers/sincronizarNoticias.js";
import { resumir } from "../controllers/resumirNoticias.js";

export async function noticiaRoutes(req, url) {
    if(url.pathname === "/noticias/obterdata" && req.method === "POST") {
        return await buscarNoticiasData(req, url);
    }

    if(url.pathname === "/noticias/obtertermo" && req.method === "POST") {
        return await buscarNoticiasTermo(req, url);
    }

    if(url.pathname === "/noticias/obtertermodata" && req.method === "POST") {
        return await buscarNoticiasTermoData(req, url);
    }

    if(url.pathname === "/noticias/sincronizar" && req.method === "POST") {
        return await sincronizarNoticias(req, url);
    }

    if(url.pathname === "/noticias/resumir" && req.method === "GET") {
        return await resumir(req, url);
    }

    return null;
}