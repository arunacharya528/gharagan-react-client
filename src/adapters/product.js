const axios = require('axios');

let config = {
    method: 'get',
    url: 'http://127.0.0.1:8000/api/product',
    headers: {},
    maxRedirects: 0
};


export const getProducts = () => {
    return axios(config)
}

