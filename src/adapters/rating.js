const apiURL = process.env.REACT_APP_API_URL;

const axios = require('axios');
const qs = require('qs');


export const postRating = (token, data) => {
    data = qs.stringify(data);
    let config = {
        method: 'post',
        url: `${apiURL}/productRating/`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}

export const deleteRating = (token,id) => {
    let config = {
        method: 'delete',
        url: `${apiURL}/productRating/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        maxRedirects: 0
    };

    return axios(config)
}