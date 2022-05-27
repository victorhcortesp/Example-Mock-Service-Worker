const axios = require('axios');
const { baseUrl } = require('./config');

const instanceAxios = axios.create({ baseURL: baseUrl });

const addPosition = async (data) => {
  const response = await instanceAxios.post('/positions', data);
  return response.data;
};

module.exports = { addPosition };
