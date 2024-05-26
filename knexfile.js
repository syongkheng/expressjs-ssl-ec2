require('dotenv').config();

module.exports = {
    development: {
      client: 'mysql2',
      connection: {
        host: process.env.DB_URL,
        user: process.env.DB_USER,
        password: process.env.DB_PW,
        database: process.env.DB_NAME,
        charset: 'utf8'
      },
      migrations: {
        directory: './db/migrations'
      },
      seeds: {
        directory: './db/seeds'
      }
    }
  };
  