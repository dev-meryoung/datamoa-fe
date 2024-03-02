import CryptoJS from 'crypto-js';

// API 인증을 위해
const authorAPI = (method, url) => {
  const time = Date.now().toString();
  const data = `${time}${method}${url}`;
  const secretKey = process.env.REACT_APP_AUTHOR_API_KEY;

  const hmac = CryptoJS.HmacSHA256(data, secretKey).toString(CryptoJS.enc.Hex);

  const requestHeader = {
    Authorization: `HMAC ${time}:${hmac}`,
  };

  return requestHeader;
};

export default authorAPI;
