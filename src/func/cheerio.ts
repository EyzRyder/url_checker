import { metatagsSchema } from './../schemas/metatags';
import cheerio, { CheerioAPI } from 'cheerio';

export function MetaTag(pageData: string) {
    const $: CheerioAPI = cheerio.load(pageData);

    const getMetatag = (name: string) =>
        $(`meta[name=${name}]`).attr('content') ||
        $(`meta[property="og:${name}"]`).attr('content') ||
        $(`meta[property="og:${name}"]`).attr('content');

    const tags = metatagsSchema.parse({
        title: $('title').first().text(),
        favicon: $('link[rel="shortcut icon"]').attr('href') || $('link[rel="icon"]').attr('href'),
        description: getMetatag('description'),
        img: getMetatag("image"),
    });


    return tags;
}


export function WhoIs(pageData: string) {
    const $:CheerioAPI = cheerio.load(pageData);

    const data = {
        whoRegistered: $(".container").children(".row").children(".col-md-8").children(".row").children(".col-md-12").children(".row").children(".col-md-8").first().text(),
        registeredOn: $(".container").children(".row").children(".col-md-8").children(".row").children(".col-md-12").children(".row").has($(".col-md-8")[6]).children('.col-md-8').text(),
        status: $("#siteStatusStatus").text()

    };


    return data;
}



export function UrlRep(pageData: string) {
    const $: CheerioAPI = cheerio.load(pageData);

    const data = {
        detectionsCounts: $("table.table-custom").children("tbody").children("tr").children("td").children("span.label ").first().text(),
    };


    return data;
}
