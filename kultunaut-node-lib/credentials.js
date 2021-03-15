const fetch = require('node-fetch')
const { v4 } = require('uuid')

const userAPI = "https://qyclzn87m4.execute-api.eu-west-1.amazonaws.com/dev/user/"

/**
 * Calls the user api
 * @param {id} route Takes a userid and sends this user id to kultuant and stores it in this api service db
 */
exports.setCredentials = async (id) => {
    const tmpId = id || v4()
    const response = await fetch(userAPI + tmpId);
    const res = await response.text()
    process.env.userCredentials = res
    console.log("credentials call")
    return res;
}