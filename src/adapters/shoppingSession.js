const apiURL = process.env.REACT_APP_API_URL;

const axios = require('axios');
export const getShoppingSession = (bearerToken, userId) => {
    let config = {
        method: 'get',
        url: `${apiURL}/shoppingSession?user_id=${userId}`,
        headers: {
            'Authorization': `Bearer ${bearerToken}`
        },
        maxRedirects: 0
    };

    return axios(config)
}
