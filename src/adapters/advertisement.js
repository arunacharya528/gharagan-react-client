const apiURL = process.env.REACT_APP_API_URL;

const axios = require('axios');

export const getActiveAdvertisements = () => {
    let config = {
        method: 'get',
        url: `${apiURL}/activeAds`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}

