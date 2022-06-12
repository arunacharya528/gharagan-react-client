const axios = require('axios');
const apiURL = process.env.REACT_APP_API_URL;

export const isOnMaintainance = () => {
    let config = {
        method: 'get',
        url: `${apiURL}/maintainance`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config);
}

