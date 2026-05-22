import puppeteer from "puppeteer";

export async function scraper(termo, data) {
    const browser = await puppeteer.launch({
        headless: true
    });

    const page = await browser.newPage();
    await page.goto(`https://g1.globo.com/${termo}` , {
        waitUntil: "domcontentloaded",
    });

    console.log(`Scrapeando ${termo} para data: ${data}`);

    const noticias = await page.evaluate((data, termo) => {
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
            if(dataPublicacao !== data) return;

            const titulo = post.querySelector(".feed-post-body-title")?.innerText.trim() || null;
            const paragrafo = post.querySelector(".feed-post-body-resumo")?.innerText.trim() || null;

            listaNoticias.push({
                titulo,
                paragrafo,
                data: dataPublicacao,
                termo
            });
        });

        return listaNoticias;
    }, data, termo);

    await browser.close();
    return noticias;
}