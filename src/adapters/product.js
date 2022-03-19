import { apiURL } from './url';

const axios = require('axios');
export const getProducts = (urlQuery = '', item = "item=8") => {
    let config = {
        method: 'get',
        url: `${apiURL}/product?${urlQuery}&${item}`,
        headers: {},
        maxRedirects: 0
    };
    return axios(config)
}


export const getproduct = (id) => {
    let config = {
        method: 'get',
        url: `${apiURL}/product/${id}`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config);
}