require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: process.env.CLIENT_NAME,
    connection: {
      host: process.env.SERVER_NAME,
      database: process.env.DATABASE_NAME,
      user:process.env.USER_NAME, 
      password:process.env.USER_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: process.env.MIGRATIONS_TABLE_NAME
    }
  },

  staging: {
    client: process.env.CLIENT_NAME,
    connection: {
      host: process.env.SERVER_NAME,
      database: process.env.DATABASE_NAME,
      user:process.env.USER_NAME, 
      password:process.env.USER_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: process.env.MIGRATIONS_TABLE_NAME
    }
  },

  production: {
    client: process.env.CLIENT_NAME,
    connection: {
      host: process.env.SERVER_NAME,
      database: process.env.DATABASE_NAME,
      user:process.env.USER_NAME, 
      password:process.env.USER_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: process.env.MIGRATIONS_TABLE_NAME
    }
  }
};
