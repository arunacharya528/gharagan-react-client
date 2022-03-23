const apiURL = process.env.REACT_APP_API_URL;

const axios = require('axios');

let config = {
    method: 'get',
    url: `${apiURL}/brand`,
    headers: {},
    maxRedirects: 0
};


export const getBrands = () => {
    return axios(config)
}

