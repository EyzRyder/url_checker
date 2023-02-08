import { chromium } from 'playwright'

export const getPreviewData = async (url: string) => {
    const browser = await chromium.launch(); 
    const page = await browser.newPage();

    try {
        await page.goto(url);

        async function tags() {
            const getMetatag = async (name: string) => {
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
                favicon: await page.$eval('link[rel=icon]', (el: any) => el.href),
                description: await getMetatag('description'),
                img: await getMetatag("image"),
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
    const browser = await chromium.launch(); 
    const page = await browser.newPage();

    try {
        await page.goto(url.replace('https://www.', 'https://who.is/whois/'));

        return {
            whoRegistered: await page.$eval('div.row:nth-of-type(3) > .queryResponseBody.col-md-12 > div.queryResponseBodyRow.row:nth-of-type(1) > .queryResponseBodyValue.col-md-8', (el: any) => el.innerText),
            registeredOn: await page.$eval('div.row:nth-of-type(5) > .queryResponseBody.col-md-12 > div.queryResponseBodyRow.row:nth-of-type(2) > .queryResponseBodyValue.col-md-8', (el: any) => el.innerText),
            status: await page.$eval('.text-success', (el: any) => el.innerText),
        }

    } catch (error) {
        return { error }

    } finally {
        await browser.close();
    }
}

export const getUrlRepData = async (url: string) => {

    const browser = await chromium.launch(); 
    const page = await browser.newPage();

    try {
        await page.goto(url.replace('https://www.', 'https://www.urlvoid.com/scan/'));

        return {
            detectionsCounts: await page.$eval('.label-success.label', (el: any) => el.innerText)
        }

    } catch (error) {
        return { error }

    } finally {
        await browser.close();
    }
}

