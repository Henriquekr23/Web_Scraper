import { buscarNoticiasData } from "../controllers/buscarNoticias.js";
import { sincronizarNoticias } from "../controllers/sincronizarNoticias.js";

export async function noticiaRoutes(req, url) {
    if(url.pathname === "/noticias/obterdata" && req.method === "GET") {
        return await buscarNoticiasData(req, url);
    }

    if(url.pathname === "/noticias/sincronizar" && req.method === "GET") {
        return await sincronizarNoticias(req, url);
    }

    return null;
}