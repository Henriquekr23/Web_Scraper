import { scraper } from "../services/scraperService";

export async function executarJobNoticias() {
    const termo = "tecnologia";

    try {
        console.log(`[JOB] Iniciando raspagem em ${new Date().toISOString()}`);
        const noticias = await scraper(termo);
        console.log(`[JOB] Raspagem concluída. ${noticias.length} notícias encontradas.`);
        return noticias;
    } catch(error) {
        console.error("[JOB] Erro durante a raspagem: ", error);
        return [];
    }
};

export function iniciarJobNoticias() {
    const HORAJOB = 2;
    const MINJOB = 0;

    function agendarProximaExecucao() {
        const agora = new Date();
        const proxima = new Date();

        proxima.setHours(HORAJOB, MINJOB, 0, 0);

        if(proxima <= agora) {
            proxima.setDate(proxima.getDate() + 1);
        }

        const delay = proxima.getTime() - agora.getTime();

        console.log(
            `[JOB] Próxima raspagem agendada para ${proxima.toLocaleString()}`
        );

        setTimeout(async () => {
            await executarJobNoticias();
            agendarProximaExecucao();
        }, delay);
    }

    agendarProximaExecucao();
};