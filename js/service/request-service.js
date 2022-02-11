import RequestException from "./exception/request-exception.js";

export async function getJson(url) {
    try {
        const request = await fetch(url);
        const json = await request.json();
        return json;
    } catch (e) {
        throw new RequestException("Erro ao executar função");
    }
}