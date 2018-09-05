const express = require('express');
const fs = require('fs');

const features = fs.readdirSync('features');
const imports = [];
const filteredFeatures = [];

features.forEach((feature) => {
  const dir = fs.readdirSync(`features/${feature}`);

  dir.forEach((e) => {
    if (e.includes('routes')) {
      filteredFeatures.push(feature);
      imports.push(require(`@features/${feature}/${e}`));
    }
  });
});

const routes = (app) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.json({
      success: true,
      message: 'Api Working',
    });
  });

  for (let i = 0, f = 0; i < imports.length && f < filteredFeatures.length; i += 1, f += 1) {
    router.use(`/${filteredFeatures[f]}`, imports[i]);
  }
  app.use('/api', router);
};


module.exports = routes;
