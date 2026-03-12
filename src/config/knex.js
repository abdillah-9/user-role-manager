// config/knex.js

const knexLib = require('knex');

const environment = process.env.NODE_ENV || 'development';

const config = require('../../knexfile')[environment];

const knex = knexLib(config);

module.exports = knex;