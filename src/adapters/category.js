import { apiURL } from './url';

const axios = require('axios');

let config = {
    method: 'get',
    url: `${apiURL}/productCategory`,
    headers: {},
    maxRedirects: 0
};


export const getCategories = () => {
    return axios(config)
}

