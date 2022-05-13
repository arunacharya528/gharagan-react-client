const apiURL = process.env.REACT_APP_API_URL;

export const getDeliveries = (bearerToken) => {

    const axios = require('axios');

    let config = {
        method: 'get',
        url: `${apiURL}/delivery`,
        headers: {
            'bearerToken': `Bearer ${bearerToken}`
        },
        maxRedirects: 0
    };

    return axios(config)
}