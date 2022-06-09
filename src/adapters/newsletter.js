const apiURL = process.env.REACT_APP_API_URL;
const axios = require('axios');
const qs = require('qs');


export const subscribeNewsletter = (data) => {
    data = qs.stringify(data);

    let config = {
        method: 'post',
        url: `${apiURL}/newsletter/conditionalSubscribe`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        maxRedirects: 0,
        data: data
    };

    return axios(config);
}

