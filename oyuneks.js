import puppeteer from 'puppeteer';

export default async function scrapeOyuneks() {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto('https://oyuneks.com/knight-online-world/knight-online-goldbar-alis-satis', {
        waitUntil: 'domcontentloaded',
        timeout: 0
    });

    await page.waitForTimeout(3000);

    const products = await page.evaluate(() => {
        const items = [];
        document.querySelectorAll('.productVerticalList').forEach(el => {
            const name = el.querySelector('.title a')?.innerText?.trim();
            const priceBuy = el.querySelector('.verticalButtonLeftBox .quantityPrice span')?.innerText?.replace('TL', '').replace(',', '.').trim();
            const priceSell = el.querySelector('.verticalButtonRightBox .quantityPrice span')?.innerText?.replace('TL', '').replace(',', '.').trim();

            items.push({
                name,
                priceBuy: priceBuy ? parseFloat(priceBuy) : null,
                priceSell: priceSell ? parseFloat(priceSell) : null,
                site: 'oyuneks',
                updatedAt: new Date().toISOString()
            });
        });

        return items;
    });

    await browser.close();
    return products;
}
