import { scraper } from "./scraper.js"
import { inserir } from "../database/repository.js"

const listaNoticias = scraper();

export async function inserirDados(listaNoticias) {
    for(const noticia of listaNoticias) {
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
