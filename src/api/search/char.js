const axios = require('axios');
const cheerio = require('cheerio');

async function getCharacterDetails(characterUrl) {
    try {
        const { data } = await axios.get(characterUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const $ = cheerio.load(data);

        let birthday = 'Unknown';
        $('.leftside .spaceit_pad').each((i, element) => {
            const text = $(element).text().trim();
            if (text.includes('Birthday:')) {
                birthday = text.replace('Birthday:', '').trim();
            }
        });

        const voiceActors = [];
        $('.va-t.ar').each((i, element) => {
            const name = $(element).find('a').first().text().trim();
            const language = $(element).find('small').text().trim();
            if (name) {
                voiceActors.push({ name, language });
            }
        });

        return { birthday, voiceActors };
    } catch (error) {
        console.error('Error fetching character details:', error.message);
        return { birthday: 'Unknown', voiceActors: [] };
    }
}

async function searchCharacterByName(characterName) {
    try {
        const searchUrl = `https://myanimelist.net/character.php?q=${encodeURIComponent(characterName)}`;
        const { data } = await axios.get(searchUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const $ = cheerio.load(data);
        const characters = [];
        const characterElements = $('div.js-categories-seasonal tr').slice(1);

        for (let i = 0; i < Math.min(5, characterElements.length); i++) {
            const element = characterElements[i];
            const name = $(element).find('td:nth-child(2) a').text().trim();
            const anime = $(element).find('td:nth-child(3) small').text().trim();
            const image = $(element).find('td:nth-child(1) img').attr('data-src') || 
                          $(element).find('td:nth-child(1) img').attr('src');
            const url = $(element).find('td:nth-child(2) a').attr('href');

            if (name) {
                const fullUrl = `https://myanimelist.net${url}`;
                const details = await getCharacterDetails(fullUrl);

                characters.push({
                    name,
                    anime,
                    image,
                    url: fullUrl,
                    birthday: details.birthday,
                    voiceActors: details.voiceActors
                });
            }
        }

        return characters;
    } catch (error) {
        console.error('Error searching for character:', error.message);
        return [];
    }
}

module.exports = function(app) {
    app.get('/search/char', async (req, res) => {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ status: false, error: 'Character name is required' });
        }

        try {
            const results = await searchCharacterByName(name);
            res.status(200).json({
                status: true,
                result: results
            });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    });
};