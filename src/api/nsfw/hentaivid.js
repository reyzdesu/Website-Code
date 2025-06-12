const axios = require('axios');
const cheerio = require('cheerio');

module.exports = function (app) {
  app.get('/hentai/random', async (req, res) => {
    try {
      const page = Math.floor(Math.random() * 1153);
      const response = await axios.get(`https://sfmcompile.club/page/${page}`);
      const htmlText = response.data;
      const $ = cheerio.load(htmlText);

      const hasil = [];
      $('#primary > div > div > ul > li > article').each(function (_, b) {
        hasil.push({
          title: $(b).find('header > h2').text().trim(),
          link: $(b).find('header > h2 > a').attr('href'),
          category: $(b)
            .find('header > div.entry-before-title > span > span')
            .text()
            .replace('in ', '')
            .trim(),
          share_count: $(b)
            .find('header > div.entry-after-title > p > span.entry-shares')
            .text()
            .trim(),
          views_count: $(b)
            .find('header > div.entry-after-title > p > span.entry-views')
            .text()
            .trim(),
          type: $(b).find('source').attr('type') || 'image/jpeg',
          video_1:
            $(b).find('source').attr('src') ||
            $(b).find('img').attr('data-src') ||
            '',
          video_2: $(b).find('video > a').attr('href') || '',
        });
      });

      if (hasil.length === 0) {
        return res.status(404).json({
          status: false,
          message: 'Tidak ada hasil ditemukan',
        });
      }

      res.status(200).json({
        status: true,
        page,
        count: hasil.length,
        data: hasil,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: error.message || 'Terjadi kesalahan saat mengambil data',
      });
    }
  });
};
