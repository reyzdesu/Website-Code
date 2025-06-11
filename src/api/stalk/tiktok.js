const axios = require('axios');
const cheerio = require('cheerio');

module.exports = function (app) {
    app.get('/stalk/tiktok', async (req, res) => {
        const { username } = req.query;
        if (!username) {
            return res.status(400).json({ status: false, message: 'Parameter username diperlukan' });
        }

        try {
            const response = await axios.get(`https://www.tiktok.com/@${username}?_t=ZS-8tHANz7ieoS&_r=1`, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
                }
            });

            const html = response.data;
            const $ = cheerio.load(html);
            const scriptData = $('#__UNIVERSAL_DATA_FOR_REHYDRATION__').html();

            if (!scriptData) {
                return res.status(404).json({ status: false, message: 'User tidak ditemukan' });
            }

            const parsedData = JSON.parse(scriptData);
            const userDetail = parsedData.__DEFAULT_SCOPE__?.['webapp.user-detail'];

            if (!userDetail || !userDetail.userInfo) {
                return res.status(404).json({ status: false, message: 'User tidak ditemukan' });
            }

            res.status(200).json({
                status: true,
                data: userDetail.userInfo
            });

        } catch (error) {
            res.status(500).json({
                status: false,
                message: error.message || 'Terjadi kesalahan'
            });
        }
    });
};
