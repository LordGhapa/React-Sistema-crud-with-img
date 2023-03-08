import axios from 'axios';

export default axios.create({
  baseURL: 'http://34.125.20.150:81/',
  headers: {
    Referer: 'no-referrer-when-downgrade',
  },
});
