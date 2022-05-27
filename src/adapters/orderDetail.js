const apiURL = process.env.REACT_APP_API_URL;

const axios = require('axios');


export const getOrderDetailByUser = (bearerToken, userId) => {
    let config = {
        method: 'get',
        url: `${apiURL}/orderDetail/byUser/${userId}`,
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        },
        maxRedirects: 0
    };

    return axios(config);
}

export const cancelOrder = (bearerToken, orderId) => {
    let config = {
        method: 'delete',
        url: `${apiURL}/orderDetail/${orderId}/cancel`,
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        },
        maxRedirects: 0
    };

    return axios(config)
}


export const hasOrderedProduct = (bearerToken, productId, userId) => {

    let config = {
        method: 'get',
        url: `${apiURL}/orderDetail/hasOrdered?product_id=${productId}&user_id=${userId}`,
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        },
        maxRedirects: 0
    };

    return axios(config)
}