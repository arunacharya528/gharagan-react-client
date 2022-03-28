const axios = require('axios');
const qs = require('qs');

const apiURL = process.env.REACT_APP_API_URL;

export const postToCart = (bearerToken, item) => {
    let data = qs.stringify(item);

    let config = {
        method: 'post',
        url: `${apiURL}/cartItem`,
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config);
};
