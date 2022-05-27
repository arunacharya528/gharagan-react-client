const apiURL = process.env.REACT_APP_API_URL;

const axios = require('axios');
const qs = require('qs');


export const hasRated = (userId, productId) => {
    let config = {
        method: 'get',
        url: `${apiURL}/productRating/hasRated?user_id=${userId}&product_id=${productId}`,
        headers: {},
        maxRedirects: 0
    };
    return axios(config)
}

export const postRating = (data) => { 
    data = qs.stringify(data);
    let config = {
        method: 'post',
        url: `${apiURL}/productRating/`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}