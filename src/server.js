import { noticiaRoutes } from "./routes/noticiaRoutes";
import { httpResponse } from "./utils/response.js";

const server = Bun.serve({
    port: 3000,

    async fetch(req) {
        const url = new URL(req.url);

        if(url.pathname === "/") {
            return httpResponse.success({
                status: "ok",
                mensagem: "API de Web Scraping funcionando"
            });
        }

        const response = await noticiaRoutes(req, url);

        if (response) return response;

        return httpResponse.notFound();
    }
});

console.log(`Servidor rodando porta ${server.port}`);