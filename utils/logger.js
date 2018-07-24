const log = require('tracer').console({
  format: '{{message}} - {{file}}:{{line}}',
}).log;

module.exports = log;
