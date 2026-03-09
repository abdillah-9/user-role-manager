require('dotenv').config();
const environment = process.env.ACTIVE_ENVIRONMENT;
const config = require('../../knexfile')[environment];
const knex = require('knex')(config);

module.exports = knex;
