
const queryString = require('query-string')
/**
 * 
 * @param {*} value The passing value at the address bar
 * @param {*} type The element type from address bar
 * @param {*} status [single/multiple] [single is single string value to element] [multiple is array to element]
 */
const handleURLUpdate = (data = [{ value: String, type: String }], status = "multiple", location, navigate) => {

    // console.log(location.search);
    const parsedData = queryString.parse(location.search);

    data.map((item) => {
        // var list = !parsedData
        // converting value to string
        // value += ""
        // if there is no sub-component, create sub component
        var list;
        if (!parsedData[item.type]) {
            parsedData[item.type] = ''
            list = []
        } else {
            // else split the list into array
            list = parsedData[item.type].split(",")
        }

        // see if the array has value
        if (list.includes(item.value + "")) {
            // remove if exists
            list.splice(list.indexOf(item.value), 1)
        } else {
            // add if not
            list = [...list, item.value]
        }

        // remove the element from object if length of array is 0
        if (list.length === 0) {
            delete parsedData[item.type];
        } else {
            // else join array and concatenate with element of object
            parsedData[item.type] = list.join(',')
        }

        // if provided status is single then assign single string value to object element
        if (status === 'single') {
            parsedData[item.type] = item.value;
        }
    })
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