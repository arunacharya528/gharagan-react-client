const axios = require('axios');
const qs = require('qs');
const apiURL = process.env.REACT_APP_API_URL;


export const login = (credentials) => {
    let data = qs.stringify(credentials);
    let config = {
        method: 'post',
        url: `${apiURL}/auth/login`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)

}

export const logout = (bearerToken) => {
    let config = {
        method: 'get',
        url: `${apiURL}/auth/logout`,
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        },
        maxRedirects: 0
    };

    return axios(config)
}
