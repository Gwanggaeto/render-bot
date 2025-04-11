import scrapeOyuneks from './scrapers/oyuneks.js';

const run = async () => {
    const results = await scrapeOyuneks();
    console.log(JSON.stringify(results, null, 2));
};

run();
