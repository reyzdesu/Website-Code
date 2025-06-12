module.exports = function(app) {
  app.get('/nsfw/bokep', async (req, res) => {
    const { url } = req.query;

    if (!url) {
      return res.status(400).json({
        status: false,
        msg: 'Parameter "url" wajib diisi'
      });
    }

    const result = await getVideo(url);

    if (!result.status) {
      return res.status(500).json({
        status: false,
        msg: result.msg || 'Terjadi kesalahan saat memproses permintaan'
      });
    }

    res.status(200).json({
      status: true,
      author: result.author,
      description: result.description,
      video: result.video
    });
  });
};