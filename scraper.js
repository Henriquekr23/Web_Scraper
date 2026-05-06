import puppeteer from "puppeteer";
import { inserir, init } from "./js/db.js";

async function run() {
    await init();

    const browser = await puppeteer.launch({
        headless: true //true para rodar sem abrir o navegador
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

    try {
        await inserir(data.titulo, data.paragrafo);
        console.log("Dados salvos em banco!");
    } catch(err) {
        console.log(err);
    }

    await browser.close();
}

run();