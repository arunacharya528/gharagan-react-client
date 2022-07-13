const axios = require('axios');
const apiURL = process.env.REACT_APP_API_URL;
const qs = require('qs');


export const postQA = (token, data) => {
    data = qs.stringify(data);
    let config = {
        method: 'post',
        url: `${apiURL}/questionAnswer/`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config)
}

export const deleteQA = (token,id) => {
    let config = {
        method: 'delete',
        url: `${apiURL}/questionAnswer/${id}`,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        maxRedirects: 0
    };

    return axios(config)
}
