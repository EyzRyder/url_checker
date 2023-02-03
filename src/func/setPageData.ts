import { MetaTag, UrlRep, WhoIs } from "./cheerio";
import { fetchPageData } from "./fechData";

export const getPreviewData = async (data:string) => {
    try {
        let pageinfo: string = await fetchPageData(data);
        let tags = await MetaTag(pageinfo);
        return tags;
    } catch (error) {
        return { error }
    }
}
export const getWhoIsData = async (data: string) => {
    try {
        let pageinfo: string = await fetchPageData(data.replace('https://www.', 'https://who.is/whois/'));
        let response = await WhoIs(pageinfo);
        return response;
    } catch (error) {
        return { error }
    }
}

export const getUrlRepData = async (data: string) => {
    try {
        let pageinfo: string = await fetchPageData(data.replace('https://www.', 'https://www.urlvoid.com/scan/'));
        let response = await UrlRep(pageinfo);
        return response;
    } catch (error) {
        return { error }
    }
}
