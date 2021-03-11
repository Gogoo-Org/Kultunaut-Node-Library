const {api} = require('./api-lib.js')

const fieldsList = '&page=1&fieldlist=Title,Startdate,Enddate'
const location = (lat, lon, radius) => 'lat=' + lat + '&lon=' + lon + '&radius=' + radius

const handler = (res, error) => {
    if (error) console.error(error)
    else {
        console.table(res)
    }
}

/**
 * Get a single event
 * @param {string} id kultunautEventId
 */
exports.getById = (id) => {
    const params = 'EventId?Id='+id
    api(params, handler)
}

/**
 * Get a list of events
 * @param {string[]} ids kultunautEventIds
 */
exports.getByIds = (ids) => {
    const params = 'EventId?Id='+ids.reduce((acc, item)=> acc+","+item)
    console.log(params)
    api(params, handler)
}

/**
 * Respond log get
 * @param {string} lat latitude
 * @param {string} lon longitude
 * @param {number} radius radius
 */
exports.listByLocation = (lat, lon) => {
    var radius = 1000
    const params = 'EventLonLatDate?'+location(lat, lon, radius)+fieldsList
    api(params, handler)
}
