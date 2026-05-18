import { inserir } from "../database/repositorioDataBase";

export async function inserirNoticias(noticias) {
    for(const noticia of noticias) {
        try {
            const res = await inserir(
                noticia.titulo,
                noticia.paragrafo,
                noticia.termo
            );
            console.log(res);
        } catch(error) {
            console.log("Erro ao inserir notícias no banco: ", error);
        }
    }
}