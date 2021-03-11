const fetch = require('node-fetch')

const BASE = 'https://www.kultunaut.dk/perl/'

async function getCredentials() {
    const response = await fetch("https://www.kultunaut.dk/perl/oauth2/token", {
        method: 'POST',
        body: process.env.credentials
    });
    const res = await response.json();
    return res.access_token
}

async function call(route) {
    const response = await fetch(BASE + route, {
        headers: {
            Authorization: await getCredentials()
        }
    });
    const res = await response.json();
    return res
}


/**
 * Calls the api
 * @param {string} route parameters in addition to the base url
 */
exports.api = async (route) => {
    return await call('api2/' + route)
}