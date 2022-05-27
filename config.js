require('dotenv').config({ path: `${__dirname}/.env` });

const { BASE_URL } = process.env;

const config = { baseUrl: BASE_URL };

module.exports = config;
