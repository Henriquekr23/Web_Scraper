import puppeteer from "puppeteer";

export async function scraper(termo) {
    const browser = await puppeteer.launch({
        headless: true //true para rodar sem abrir o navegador
    });

    const page = await browser.newPage();
    await page.goto(`https://g1.globo.com/${termo}` , {
        waitUntil: "domcontentloaded",
    });

    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, "0");
    const dia = String(hoje.getDate()).padStart(2, "0");

    const dataHoje = `${ano}/${mes}/${dia}`;

    console.log(dataHoje, `https://g1.globo.com/${termo}`);

    const noticias = await page.evaluate((dataHoje, termo) => {
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
                data: dataHoje,
                termo
            });
        });

        return listaNoticias;
    }, dataHoje, termo);

    await browser.close();
    return noticias;
}