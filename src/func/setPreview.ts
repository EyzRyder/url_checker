import { MetaTag } from "./cheerio";
import { fetchPageData } from "./fechData";

const setPreview = async (data:string) => {
    try {
        let pageinfo: string = await fetchPageData(data);
        let tags = await MetaTag(pageinfo);
        return tags;
    } catch (error) {
        return { error }
    }
}

export {
    setPreview
}