const apiURL = process.env.REACT_APP_API_URL;

const axios = require('axios');

export const getActiveAdvertisements = () => {
    let config = {
        method: 'get',
        url: `${apiURL}/advertisement/active`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}

