const fetch = require('node-fetch')

const BASE = 'https://www.kultunaut.dk/perl/'

const HEAD = 'Bearer zjbpYur6Uj4SmDZpD3uU%2FtrZ4sVT8L8n5DRinfzO6bQabunTfp6nXUIbZaFwF0gvz3%2Bje6ktBxMRkMTJEfgzfH09ndHU9ymVjHuHGHBPh74jni3yirsXm2Bob%2FNziP8QejsjDzzMfS9ydcL%2B5%2FW7AQ%3D%3D'

function call(route, body, method, callBack) {
    const init = method === "POST" ? {
        method: method,
        body: body
    } : {}
    fetch(BASE + route, {
        headers: {
            Authorization: HEAD
        },
        ...init
    })
        .then(res => res.json())
        .then(json => {
            if (json.error) return callBack(undefined, json)
            return callBack(json, undefined)
        })
        .catch(error => callBack(undefined, error))
}



/**
 * Calls the api
 * @param {string} route parameters in addition to the base url
 * @param {function} callBack callBack(response and error)
 */
exports.api = (route, callBack) => {
    call('oauth2/token', 'username=gogooanton&password=6fc92b5cf5748096519b1cca45db4e52f5caddd25de32a21d67390c42d9ae3ef&grant_type=password&client_id=gogoo&client_secret=sss', 
    'POST', console.log)
    //return call('api2/' + route, {}, 'GET', callBack)
}