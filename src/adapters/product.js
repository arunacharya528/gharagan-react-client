import { apiURL } from './url';

const axios = require('axios');

let config = {
    method: 'get',
    url: `${apiURL}/product`,
    headers: {},
    maxRedirects: 0
};


export const getProducts = () => {
    return axios(config)
}

