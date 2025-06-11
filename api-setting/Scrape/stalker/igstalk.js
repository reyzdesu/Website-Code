const axios = require("axios");
const cheerio = require("cheerio");

async function igstalk(username) {
  try {
    const baseurl = "https://insta-stories-viewer.com";
    const url = `${baseurl}/${username}/`;
    const { data: html } = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
      },
    });

    const $ = cheerio.load(html);

    const avatar = $(".profile__avatar-pic").attr("src");
    const name = $(".profile__nickname").contents().first().text().trim();
    const posts = $(".profile__stats-posts").text().trim();
    const followers = $(".profile__stats-followers").text().trim();
    const following = $(".profile__stats-follows").text().trim();
    const bio = $(".profile__description").text().trim();

    const result = {
      avatar,
      username: name,
      posts,
      followers,
      following,
      bio,
    };

    return result;
  } catch (err) {
    return { error: err.message };
  }
}

// Contoh penggunaan
module.exports = igstalk;
