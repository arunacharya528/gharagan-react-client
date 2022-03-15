import { apiURL } from './url';

const axios = require('axios');
export const getProducts = (urlQuery = '') => {
    let config = {
        method: 'get',
        url: `${apiURL}/product?${urlQuery}`,
        headers: {},
        maxRedirects: 0
    };
    return axios(config)
}
