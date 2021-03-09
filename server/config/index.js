require('dotenv').config();

const config = {
  giphyApiKey: process.env.GIPHY_API_KEY,
  port: process.env.PORT

};

module.exports = { config };
