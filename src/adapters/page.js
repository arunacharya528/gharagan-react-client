const apiURL = process.env.REACT_APP_API_URL;

const axios = require('axios');


export const getPageLinks = () => {
    let config = {
        method: 'get',
        url: `${apiURL}/pageLink`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}
