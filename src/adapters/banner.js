const apiURL = process.env.REACT_APP_API_URL;

const axios = require('axios');

let config = {
    method: 'get',
    url: `${apiURL}/banner`,
    headers: {},
    maxRedirects: 0
};


export const getBanners = () => {
    return axios(config)
}

