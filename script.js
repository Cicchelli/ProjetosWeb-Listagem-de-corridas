import { get } from 'axios';
import { load } from 'cheerio';

const baseURLs = [
    'https://www.portaldascorridas.com.br/',
    'https://portaldoatleta.com/',
];

const getRaces = async () => {
    const races = [];
    const racePromises = baseURLs.map(async (baseURL) => {
        const response = await get(baseURL);
        const $ = load(response.data);

        $(`a[href*="corrida"]`, $).each((i, link) => {
            const href = $(link).attr('href');
            const fullURL = `${baseURL}${href}`;
            get(fullURL)
                .then(response => {
                    const $ = load(response.data);
                    const title = $('h1').text();
                    const date = $('.data-corrida').text();
                    const location = $('.local-corrida').text();

                    races.push({ title, date, location, url: fullURL });
                })
                .catch(error => console.error(`Error fetching race details: ${fullURL}`, error));
        });
    });

    await Promise.all(racePromises);
    return races;
};

const filterNearbyRaces = (races, center) => {
    const maxDistance = 150; // kilometers
    const earthRadiusKm = 6371;

    return races.filter(race => {
        const lat1 = parseFloat(center.lat);
        const lon1 = parseFloat(center.lon);
        const lat2 = parseFloat(race.location.split(',')[0]);
        const lon2 = parseFloat(race.location.split(',')[1]);

        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 18) *
                Math.cos((lat2 * Math.PI) / 180) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);

        return a;
    });
};
