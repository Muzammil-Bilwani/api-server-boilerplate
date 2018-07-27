const express = require('express');
const users =  require('../features/users/user.routes');

const routes = (app) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.json({
      success: true,
      message: 'Api Working',
    });
  });
  router.use('/users', users);

  app.use('/api', router);
};


module.exports = routes;
