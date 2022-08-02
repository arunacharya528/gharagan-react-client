const apiURL = process.env.REACT_APP_API_URL;
const axios = require('axios');


export const getProducts = (urlQuery = '') => {
    let config = {
        method: 'get',
        url: `${apiURL}/allProduct${urlQuery}`,
        headers: {},
        maxRedirects: 0
    };
    return axios(config)
}


export const getproduct = (id) => {
    let config = {
        method: 'get',
        url: `${apiURL}/oneProduct/${id}`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config);
}