import fetch from 'node-fetch';

const userAPI = "https://qyclzn87m4.execute-api.eu-west-1.amazonaws.com/dev/user/"

/**
 * Calls the user api
 * @param {id} route Takes a userid and sends this user id to kultuant and stores it in this api service db
 */
export async function setCredentials(id?:string):Promise<string>{
    const tmpId = id || "anongogoouser"
    const response = await fetch(userAPI + tmpId);
    const res = await response.text()
    process.env.userCredentials = res
    console.log("credentials call")
    return res;
}