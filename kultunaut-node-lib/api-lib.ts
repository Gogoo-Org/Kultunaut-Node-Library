import fetch from 'node-fetch'
import { setCredentials } from "./credentials";
const BASE = 'https://www.kultunaut.dk/perl/'

async function call(route:String): Promise<any>{
    const credentials = process.env.userCredentials || await setCredentials()
    const response = await fetch(BASE + route, {
        headers: {
            Authorization: credentials
        }
    });
    return (await response.json()).result
}

/**
 * Calls the api
 * @param {string} route parameters in addition to the base url
 */
export async function api(route:string):Promise<any>{
    return await call('api2/' + route)
}