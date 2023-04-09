import { chromium } from 'playwright-chromium'
import "dotenv/config";
process.env.PLAYWRIGHT_BROWSERS_PATH = "1";

export const getPreviewData = async (url: string) => {
    const browser = await chromium.launch({
        // executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', 
        // headless: false,
    });
    const page = await browser.newPage();

    try {
        url = "https://www." + url;

        await page.goto(url);

        async function tags() {
            const getMetaTag = async (name: string) => {
                try {
                    return await page.$eval(`meta[name=${name}]`, (el: any) => el.content)
                }
                catch (err) {
                    err
                }
                try {
                    return await page.$eval(`meta[property="og:${name}"]`, (el: any) => el.content)
                }
                catch (err) {
                    err
                }
            }
            return {
                title: await page.$eval('title', (el: any) => el.innerText),
                description: await getMetaTag('description'),
                img: await getMetaTag("image"),
            }
        }

        return await tags();

    } catch (error) {
        return { error }

    } finally {

        await browser.close();

    }

}

export const getWhoIsData = async (url: string) => {
    const browser = await chromium.launch({
        // executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', 
        // headless: false,
    });
    const page = await browser.newPage().catch(err => { throw Error(err) });

    try {
        await page.goto('https://who.is').catch(err => { throw Error(err) });
        const input:any = await page.$('.input-lg.form-control')
        await input.type(url).then(() => input.press('Enter'));
        await page.waitForSelector("div.row:nth-of-type(3) > .queryResponseBody.col-md-12 > div.queryResponseBodyRow.row:nth-of-type(1) > .queryResponseBodyValue.col-md-8");

        let registerData = await page.$eval('pre', (el: any) => el.innerText)
        registerData = registerData.split("\n");

        return {
            whoRegistered: await page.$eval('div.row:nth-of-type(3) > .queryResponseBody.col-md-12 > div.queryResponseBodyRow.row:nth-of-type(1) > .queryResponseBodyValue.col-md-8', (el: any) => el.innerText),
            registerData
        }

    } catch (error) {
        return { error }

    } finally {
        await browser.close();
    }
}

export const getUrlRepData = async (url: string) => {

    const browser = await chromium.launch({
        // executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', 
        // headless: false,
    });
    const page = await browser.newPage().catch(err => { throw Error(err) });

    try {
        url = 'https://www.urlvoid.com/scan/'+url;
        await page.goto(url).catch(err => {throw Error(err)});

        return {
            detectionsCounts: await page.$eval('.label-success.label', (el: any) => el.innerText),
            domainAge: await page.$eval('div.panel-success.panel:nth-of-type(2) > .panel-body > .table-responsive > .table-striped.table-custom.table > tbody > tr:nth-of-type(4) > td:nth-of-type(2)', (el: any) => el.innerText),
            serverLocal: await page.$eval('div.panel-success.panel:nth-of-type(2) > .panel-body > .table-responsive > .table-striped.table-custom.table > tbody > tr:nth-of-type(9) > td:nth-of-type(2)', (el: any) => el.innerText)
        }

    } catch (error) {
    return { error, message:"could not get url reputation" }

    } finally {
        await browser.close();
    }
}

