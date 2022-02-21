import * as puppeteer from "puppeteer";

async function scrapeData() {
    const kantineUrl = "https://play.loopsign.eu/app/218/498351";
    const browser = await puppeteer.launch({});
    const page = await browser.newPage();
    await page.goto(kantineUrl);
    await page.waitForSelector(`div[data-contents="true"]`);
    //await page.screenshot({ path: "menu.png" });
    const menuPage = await page.$$(`span[data-text="true"]`);
    let menuItems = [];
    for (const menuItem of menuPage) {
        const item = await menuItem.getProperty("innerText");
        menuItems.push(await item.jsonValue());
    }
    await browser.close();
    return menuItems;
}

scrapeData()
    .then(console.log)
    .then(() => console.log("Finished"));
