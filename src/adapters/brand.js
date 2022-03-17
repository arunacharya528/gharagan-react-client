import { apiURL } from './url';

const axios = require('axios');

let config = {
    method: 'get',
    url: `${apiURL}/brand`,
    headers: {},
    maxRedirects: 0
};


export const getBrand = () => {
    return axios(config)
}

