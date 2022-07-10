const apiURL = process.env.REACT_APP_API_URL;

const axios = require('axios');


export const getPageLinks = () => {
    let config = {
        method: 'get',
        url: `${apiURL}/allPageLinks`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}


export const getPage = (slug) => {
    let config = {
        method: 'get',
        url: `${apiURL}/page/bySlug/${slug}`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}