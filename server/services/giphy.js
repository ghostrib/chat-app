const url = require('url');

const axios = require('axios');
const { config } = require('../config');

const buildParams = query => {
  return new url.URLSearchParams({
    api_key: config.giphyApiKey,
    q: query,
    offset: 0,
    lang: 'en',
    limit: 10,
  });
};

const searchGifs = async query => {
  const params = buildParams(query);

  const setup = {
    method: 'get',
    url: 'search',
    baseURL: 'https://api.giphy.com/v1/gifs/',
    params: params,
  };

  try {
    const response = await axios(setup);
    const urls = await response.data.data.map(item => item.embed_url);
    return JSON.stringify(urls);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  searchGifs,
};
