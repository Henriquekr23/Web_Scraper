import puppeteer from "puppeteer";
import { inserir, criar, comparar } from "./db.js";

async function run() {
    await criar();

    const browser = await puppeteer.launch({
        headless: true //true para rodar sem abrir o navegador
    });

    const page = await browser.newPage();

    // acessa a página de teste do wikipedia
    await page.goto("https://g1.globo.com/tecnologia/", {
        waitUntil: "domcontentloaded",
    });

    // Data de hoje no formato YYYY/MM/DD

    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate() - 1).padStart(2, "0");

    const dataHoje = `${ano}/${mes}/${dia}`;
    console.log(dataHoje);

    const noticias = await page.evaluate((dataHoje) => {
        const posts = document.querySelectorAll(".feed-post");
        const listaNoticias = [];

        posts.forEach((post) => { 
            const link =
                post.querySelector("a.feed-post-link")?.href ||
                post.querySelector("a")?.href ||
                null;
            if(!link) return;

            const match = link.match(/\/noticia\/(\d{4}\/\d{2}\/\d{2})\//);
            if(!match) return;

            const dataPublicacao = match[1];
            if(dataPublicacao !== dataHoje) return;

            const titulo = post.querySelector(".feed-post-body-title")?.innerText.trim() || null;
            const paragrafo = post.querySelector(".feed-post-body-resumo")?.innerText.trim() || null;

            listaNoticias.push({
                titulo,
                paragrafo,
                data: dataHoje
            });
        });

        return listaNoticias;
    }, dataHoje);

    console.log(`Encontrados ${noticias.length} notícias hoje.`);

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
    
    await browser.close();
}

run();