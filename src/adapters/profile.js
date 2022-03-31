const axios = require('axios');
const apiURL = process.env.REACT_APP_API_URL;
const qs = require('qs');

export const getUser = (bearerToken, userId) => {

    let config = {
        method: 'get',
        url: `${apiURL}/user/${userId}`,
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        },
        maxRedirects: 0
    };

    return axios(config);
}

export const updateUser = (bearerToken, userId, userData) => {
    let data = qs.stringify(userData);
    let config = {
        method: 'put',
        url: `${apiURL}/user/${userId}`,
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };
    return axios(config)
}

export const updateAddress = (bearerToken, addressId, addressData) => {
    let data = qs.stringify(addressData);
    let config = {
        method: 'put',
        url: `${apiURL}/userAddress/${addressId}`,
        headers: {
            'Authorization': `Bearer ${bearerToken}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}