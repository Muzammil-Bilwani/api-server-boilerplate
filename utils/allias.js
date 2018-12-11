const moduleAlias = require('module-alias');

const makePath = path => `${__dirname}/../${path}`;

const paths = [
  'handlers',
  'utils',
  'config',
  'database',
  'features'];

const initialization = () => {
  paths.forEach((element) => {
    moduleAlias.addAlias(`@${element}`, makePath(element));
  });
};

module.exports = initialization;
