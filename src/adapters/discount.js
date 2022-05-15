const apiURL = process.env.REACT_APP_API_URL;

const axios = require('axios');


export const getDiscountByName = (name) => {

    let config = {
        method: 'get',
        url: `${apiURL}/discount/${name}/find`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config);
}