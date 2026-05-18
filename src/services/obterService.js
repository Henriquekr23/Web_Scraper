import { obter } from "../database/repositorioDataBase";

export async function dataHoje() {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");

    const dataHoje = `${ano}-${mes}-${dia}`;

    return dataHoje;
}

export async function obterNoticiasData() {
    const data = await dataHoje();
    const noticias = await obterPorData(data);

    return noticias;
}

export async function obterNoticiasTermo() {
    const data = await dataHoje();
    const noticias = await obterPorData(data);

    return noticias;
}