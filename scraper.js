import puppeteer from "puppeteer";

async function run() {
    const browser = await puppeteer.launch({
        headless: false //true para rodar sem abrir o navegador
    });

    const page = await browser.newPage();

    // acessa a página de teste do wikipedia
    await page.goto("https://pt.wikipedia.org/wiki/Brasil", {
        waitUntil: "domcontentloaded",
    });

    const data = await page.evaluate(() => {
        const titulo = document.querySelector("#firstHeading")?.innerText;
        const paragrafo = document.querySelector("#mwAQ")?.innerText;

        return { titulo, paragrafo };
    });

    console.log("Título: ", data.titulo);
    console.log("Parágrafo: ", data.paragrafo);

    await browser.close();
}

run();