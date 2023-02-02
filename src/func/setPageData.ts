import { MetaTag, WhoIs } from "./cheerio";
import { fetchPageData } from "./fechData";

const getPreviewData = async (data:string) => {
    try {
        let pageinfo: string = await fetchPageData(data);
        let tags = await MetaTag(pageinfo);
        return tags;
    } catch (error) {
        return { error }
    }
}
const getWhoIsData = async (data: string) => {
    try {
        let pageinfo: string = await fetchPageData(data.replace('https://www.', 'https://who.is/whois/'));
        let response = await WhoIs(pageinfo);
        return response;
    } catch (error) {
        return { error }
    }
}

export {
    getPreviewData,
    getWhoIsData
}