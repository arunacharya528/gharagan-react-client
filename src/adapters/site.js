const apiURL = process.env.REACT_APP_API_URL;
const axios = require('axios')

export const getSiteDetails = () => {
    let config = {
        method: 'get',
        url: `${apiURL}/allSiteDetail`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}

