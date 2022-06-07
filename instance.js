const axios = require('axios');
const { baseUrl } = require('./config');

const instanceAxios = axios.create({ baseURL: baseUrl });

const addUser = async (data) => {
  const response = await instanceAxios.post('/user', data);
  return response.data;
};

const getUsers = () => instanceAxios.get('/users');

module.exports = { addUser, getUsers };
