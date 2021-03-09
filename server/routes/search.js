module.exports = (app) => {
  const { giphy } = require('../services');
  const router = require('express').Router();

  router.post('/gifs', async (req, res, next) => {
    const gifs = await giphy.searchGifs(req.body.query);
    res.send(gifs);
    next();
  });

  app.use('/search', router);
};
