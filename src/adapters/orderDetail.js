const apiURL = process.env.REACT_APP_API_URL;
const webURL = process.env.REACT_APP_WEB_URL;

const axios = require('axios');

export const cancelOrder = (token, orderId) => {
    let config = {
        method: 'delete',
        url: `${apiURL}/orderDetail/${orderId}/cancel`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0
    };

    return axios(config)
}


export const getOrderDetail = (token, orderId) => {

    let config = {
        method: 'get',
        url: `${apiURL}/orderDetail/${orderId}`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0
    };

    return axios(config);
}

export const getInvoice = (token, id) => {
    return fetch(`${webURL}/view/invoice/${id}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}