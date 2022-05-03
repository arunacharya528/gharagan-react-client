const apiURL = process.env.REACT_APP_API_URL;

const axios = require('axios');



export const getBrands = () => {
    let config = {
        method: 'get',
        url: `${apiURL}/brand`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}

export const getBrand = (id) => { 
    let config = {
        method: 'get',
        url: `${apiURL}/brand/${id}`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)

}

