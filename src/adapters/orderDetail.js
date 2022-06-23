const apiURL = process.env.REACT_APP_API_URL;

const axios = require('axios');

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


export const getOrderDetail = (bearerToken, orderId) => {

    let config = {
        method: 'get',
        url: `${apiURL}/orderDetail/${orderId}`,
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        },
        maxRedirects: 0
    };

    return axios(config);
}