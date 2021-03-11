/**
 * @name KultunautClient
 */

const { api } = require('./api-lib.js')

const fieldsList = (page) => '&page=' + page + '&fieldlist=Title,Startdate,Enddate,Tags,Image'
const location = (lat, lon, radius) => 'lat=' + lat + '&lon=' + lon + '&radius=' + radius

const FEED_DEFAULT_LENGTH = 100

/**
 * Get a single event
 * @param {string} id kultunautEventId
 */
exports.getById = async (id) => {
    const params = 'EventId?Id=' + id
    return await api(params)
}

/**
 * Get a list of events
 * @param {string[]} ids kultunautEventIds
 */
exports.getByIds = async (ids) => {
    const params = 'EventId?Id=' + ids.reduce((acc, item) => acc + "," + item)
    console.log(params)
    return await api(params)
}

/**
 * @function listByLocation Lists events by location
 * 
 * Gets a list of events sorted by distance. 
 * 
 * The lenght is dynamic, either it is shorter than 2 x FEED_DEFAULT_LENGTH
 * 
 * @param {string} lat latitude
 * @param {string} lon longitude
 * @param {string[]} viewed the ids of all the already viewed events
 */
exports.listByLocation = async ({lat, lon, viewed}) => {
    var list = []
    var page = 1
    var radius = 1000
    while (list.length <FEED_DEFAULT_LENGTH) {
        const params = 'EventLonLatDist?'+location(lat, lon, radius)+'&pagesize='+FEED_DEFAULT_LENGTH+fieldsList(page)
        const result = (await api(params)).result
        if(!result || result.length!==FEED_DEFAULT_LENGTH){
            list = []
            page = 0
            radius = radius + 1000
        } else {
            const filtered = result.filter(({ Id }) => !viewed.includes(Id))
            list = [...list, ...filtered]
            page = page + 1
        }

    }
    return list
}


/**
 * Gets a list of the size up to 100 items
 * @function search on Kultunaut
 * @param {string} lat latitude
 * @param {string} lon longitude
 * @param {number} radius theradius
 * @param {string} enddate OPTIONAL how events starting before date, format: dd-mm-yyyy, default current day + 180 days
 * @param {string} startdate OPTIONAL show events ending after date, format: dd-mm-yyyy, default current day
 */
 exports.search = async ({lat, lon, radius, enddate, startdate}) => {
    var list = []
    var page = 1
    var radius = 1000
    while (list.length <FEED_DEFAULT_LENGTH) {
        const params = 'EventLonLatDate?'+location(lat, lon, radius)+'&pagesize='+FEED_DEFAULT_LENGTH+fieldsList(page)
        const result = (await api(params)).result
        if(!result || result.length!==FEED_DEFAULT_LENGTH){
            list = []
            page = 0
            radius = radius + 1000
        } else {
            const filtered = result.filter(({ Id }) => !viewed.includes(Id))
            list = [...list, ...filtered]
            page = page + 1
        }

    }
    return list
}
