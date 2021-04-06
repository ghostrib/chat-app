module.exports = app => {
  const path = require('path');
  const router = require('express').Router();

  router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
    next();
  });

  app.use('/', router);
};
