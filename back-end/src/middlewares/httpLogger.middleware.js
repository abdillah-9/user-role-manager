const logger = require('../utils/pino');
const pinoHttp = require('pino-http');
const { randomUUID } = require('crypto');

module.exports = pinoHttp({

  logger,

  genReqId: () => randomUUID(),

  customLogLevel: (req, res) => {
    if (res.statusCode >= 500) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  },

  customSuccessMessage: (req, res) => {
    return `${req.method} ${req.url} completed with statusCode ${res.statusCode}`;
  },

  customErrorMessage: (req, res, err) => {
    return `${req.method} ${req.url} failed with ${err.message}`;
  },

  redact: [
    'req.headers.authorization',
    'req.body.password'
  ]

});