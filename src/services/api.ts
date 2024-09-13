import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://digitute.pythonanywhere.com',
});

export default instance;
