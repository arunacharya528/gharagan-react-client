const axios = require('axios');
const qs = require('qs');
const apiURL = process.env.REACT_APP_API_URL;


export const login = (credentials) => {
    let data = qs.stringify(credentials);
    let config = {
        method: 'post',
        url: `${apiURL}/login`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)

}

export const getIfLoggedIn = (data) => {
    data = qs.stringify(data);
    let config = {
        method: 'post',
        url: `${apiURL}/get-if-logged-in`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)

}

export const logout = (token) => {
    let config = {
        method: 'get',
        url: `${apiURL}/logout`,
        headers: {
            'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0
    };

    return axios(config)
}

export const sendVerificationNotification = (token) => {
    let config = {
        method: 'post',
        url: `${apiURL}/email/sendVerificationNotification`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0,
    };

    return axios(config)
}

export const verifyEmail = (token, data) => {
    data = qs.stringify(data)
    let config = {
        method: 'post',
        url: `${apiURL}/email/verify`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}