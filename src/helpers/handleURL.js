
const queryString = require('query-string')
/**
 * 
 * @param {*} value The passing value at the address bar
 * @param {*} type The element type from address bar
 * @param {*} status [single/multiple] [single is single string value to element] [multiple is array to element]
 */
const handleURLUpdate = (value, type, status = "multiple", location, navigate) => {

    // converting value to string
    value += ""
    const parsedData = queryString.parse(location.search);
    // if there is no sub-component, create sub component
    var list;
    if (!parsedData[type]) {
        parsedData[type] = ''
        list = []
    } else {
        // else split the list into array
        list = parsedData[type].split(",")
    }

    // see if the array has value
    if (list.includes(value + "")) {
        // remove if exists
        list.splice(list.indexOf(value), 1)
    } else {
        // add if not
        list = [...list, value]
    }

    // remove the element from object if length of array is 0
    if (list.length === 0) {
        delete parsedData[type];
    } else {
        // else join array and concatenate with element of object
        parsedData[type] = list.join(',')
    }

    // if provided status is single then assign single string value to object element
    if (status === 'single') {
        parsedData[type] = value;
    }

    // setQuery(parsedData);
    // navigate page to required path
    navigate('?' + queryString.stringify(parsedData))

}

/**
     * Checks with urlparametes and return true if exists and false if does not
     * @param {String} id id in urlQuery
     * @param {*} type type of element
     * @param {String} status status of element [single/multiple]
     * @returns string if single and boolean if multiple
     */
const getURLStatus = (id, type, status, location) => {
    const parsedData = queryString.parse(location.search);
    if (parsedData[type]) {
        if (status == 'single') {
            return parsedData[type]
        } else {
            return parsedData[type].split(',').includes(id)
        }
    } else {
        if (status === 'single') {
            return 0;
        }
    }
}

module.exports = {
    handleURLUpdate, getURLStatus
}