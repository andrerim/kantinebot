import * as puppeteer from "puppeteer";

async function scrapeData() {
    const kantineUrl = "https://play.loopsign.eu/app/218/498351";
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    await page.goto(kantineUrl);
    await page.waitForSelector(`div[data-contents="true"]`);
    //await page.screenshot({ path: "menu.png" });
    const r = await page.$$(`span[data-text="true"]`);
    for (const el of r) {
        console.log((await el.getProperty("innerHTML")).toString());
    }
    await browser.close();
    console.log("finished");
}

scrapeData();
