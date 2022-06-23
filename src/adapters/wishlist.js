const axios = require('axios');
const apiURL = process.env.REACT_APP_API_URL;
const qs = require('qs');

export const postWishList = (data) => {
    data = qs.stringify(data);

    let config = {
        method: 'post',
        url: `${apiURL}/wishlist`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}

export const removeFromWishList = (id) => {
    let config = {
        method: 'delete',
        url: `${apiURL}/wishlist/${id}`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}