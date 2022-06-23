const apiURL = process.env.REACT_APP_API_URL;

const axios = require('axios');

export const getCategories = () => {
    let config = {
        method: 'get',
        url: `${apiURL}/productCategory`,
        headers: {},
        maxRedirects: 0
    };
    return axios(config)
}

