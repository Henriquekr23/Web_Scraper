import { buscarNoticias } from "../controllers/buscarNoticias";
import { sincronizarNoticias } from "../controllers/sincronizarNoticias"

export async function noticiaRoutes(req, url) {
    if(url.pathname === "/noticias/obterdata" && req.method === "GET") {
        return await buscarNoticias(req, url);
    }

    if(url.pathname === "/noticias/sincronizar" && req.method === "GET") {
        return await sincronizarNoticias(req, url);
    }

    if(url.pathname === "/noticias/obtertermo")

    return null;
}