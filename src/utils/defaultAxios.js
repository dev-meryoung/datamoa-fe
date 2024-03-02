import axios from 'axios';

const defaultAxios = axios.create({
  timeout: 30000,
});

export default defaultAxios;
