import { scraper } from "./scraper.js"
import { inserir } from "../database/repository.js"

export async function inserirDados(noticias) {
    for(const noticia of noticias) {
        try {
            const res = await inserir(
                noticia.titulo,
                noticia.paragrafo
            );
            console.log(res);
        } catch(error) {
            console.log("Erro ao inserir notícias no banco: ", error);
        }
    }
}
