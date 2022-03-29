const apiURL = process.env.REACT_APP_API_URL;

const axios = require('axios');
export const getShoppingSession = (bearerToken, sessionId) => {
    let config = {
        method: 'get',
        url: `${apiURL}/shoppingSession/${sessionId}`,
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        },
        maxRedirects: 0
    };

    return axios(config)
}


export const createOrder = (bearerToken, sessionId) => {
    let config = {
        method: 'post',
        url: `${apiURL}/shoppingSession/${sessionId}/createOrder`,
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        },
        maxRedirects: 0
    };

    return axios(config)
}