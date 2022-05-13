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


    // console.log(item)
    return axios(config);
};


export const putToCart = (bearerToken, data, id) => {
    data = qs.stringify(data);
    let config = {
        method: 'put',
        url: `${apiURL}/cartItem/${id}`,
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}

export const getByProductAndSession = (bearerToken, product_id, session_id) => {
    let config = {
        method: 'get',
        url: `${apiURL}/cartItem/session/${session_id}/product/${product_id}`,
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        },
        maxRedirects: 0
    };

    return axios(config)
}

export const removeCartItem = (bearerToken, itemId) => {
    let config = {
        method: 'delete',
        url: `${apiURL}/cartItem/${itemId}`,
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        },
        maxRedirects: 0
    };

    return axios(config)
}
