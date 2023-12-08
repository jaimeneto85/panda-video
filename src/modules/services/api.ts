import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://api-v2.pandavideo.com.br',
});

client.defaults.headers.common['Accept'] = 'application/json';
client.defaults.headers.common['Authorization'] = process.env.PANDA_API_KEY;