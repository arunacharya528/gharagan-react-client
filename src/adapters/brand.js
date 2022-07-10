const apiURL = process.env.REACT_APP_API_URL;

const axios = require('axios');



export const getBrands = () => {
    let config = {
        method: 'get',
        url: `${apiURL}/allBrand`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)
}

export const getBrand = (id) => { 
    let config = {
        method: 'get',
        url: `${apiURL}/oneBrand/${id}`,
        headers: {},
        maxRedirects: 0
    };

    return axios(config)

}

