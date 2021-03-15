const fetch = require('node-fetch')
const {setCredentials} = require("./credentials")
const BASE = 'https://www.kultunaut.dk/perl/'

async function call(route) {
    console.log("api call")
    const credentials = process.env.userCredentials || await setCredentials()
    const response = await fetch(BASE + route, {
        headers: {
            Authorization: credentials
        }
    });
    return await response.json();
}

/**
 * Calls the api
 * @param {string} route parameters in addition to the base url
 */
exports.api = async (route) => {
    return await call('api2/' + route)
}