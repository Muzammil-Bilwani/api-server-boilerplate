const express = require('express');


const routes = (app) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.json({
      success: true,
      message: 'Api Working',
    });
  });


  app.use('/api', router);
};


module.exports = routes;
