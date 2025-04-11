const axios = require('axios');
const cheerio = require('cheerio');

const SITE_NAME = 'oyuneks';
const SITE_LOGO = 'https://oyuneks.com/themes/oyuneks/images/logo.png';
const URL = 'https://oyuneks.com/knight-online-world/knight-online-goldbar-alis-satis';

async function scrapeOyuneks() {
    try {
        const { data } = await axios.get(URL);
        const $ = cheerio.load(data);

        const products = [];

        $('.productVerticalList').each((i, el) => {
            const name = $(el).find('.title a').text().trim();

            const priceBuy = $(el)
                .find('.verticalButtonLeftBox .quantityPrice span')
                .first()
                .text()
                .trim()
                .replace('TL', '')
                .replace(',', '.');

            const priceSell = $(el)
                .find('.verticalButtonRightBox .quantityPrice span')
                .first()
                .text()
                .trim()
                .replace('TL', '')
                .replace(',', '.');

            products.push({
                name,
                priceBuy: parseFloat(priceBuy),
                priceSell: parseFloat(priceSell),
                site: SITE_NAME,
                logo: SITE_LOGO,
                updatedAt: new Date().toISOString()
            });
        });

        return products;
    } catch (error) {
        console.error(`Hata: ${SITE_NAME} verileri çekilemedi`, error.message);
        return [];
    }
}

module.exports = scrapeOyuneks;
