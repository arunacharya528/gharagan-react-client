const axios = require('axios');
const apiURL = process.env.REACT_APP_API_URL;
const qs = require('qs');

export const getUser = (token, type = '') => {
    let config = {
        method: 'get',
        url: `${apiURL}/user/${type}`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0
    };
    return axios(config);
}


export const postUser = (token, type = '', data) => {
    data = qs.stringify(data);
    let config = {
        method: 'post',
        url: `${apiURL}/user/${type}`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0,
        data: data
    };
    return axios(config);
}

export const updateUser = (token, userId, userData) => {
    let data = qs.stringify(userData);
    let config = {
        method: 'put',
        url: `${apiURL}/user/${userId}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };
    return axios(config)
}


export const postAddress = (token, addressData) => {
    let data = qs.stringify(addressData);
    let config = {
        method: 'post',
        url: `${apiURL}/userAddress`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}

export const putAddress = (token, addressId, addressData) => {
    let data = qs.stringify(addressData);
    let config = {
        method: 'put',
        url: `${apiURL}/userAddress/${addressId}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}

export const deleteAddress = (token, id) => {
    let config = {
        method: 'delete',
        url: `${apiURL}/userAddress/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0
    };

    return axios(config)
}

export const checkout = (token, data) => {
    data = qs.stringify(data);
    let config = {
        method: 'post',
        url: `${apiURL}/user/checkout`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config);
}