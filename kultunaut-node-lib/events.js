const {api} = require('./api-lib.js')

const fieldsList =(page)=> '&page='+page+'&fieldlist=Title,Startdate,Enddate'
const location = (lat, lon, radius) => 'lat=' + lat + '&lon=' + lon + '&radius=' + radius

const pageSize = 100

/**
 * Get a single event
 * @param {string} id kultunautEventId
 */
exports.getById = async (id) => {
    const params = 'EventId?Id='+id
    return await api(params)
}

/**
 * Get a list of events
 * @param {string[]} ids kultunautEventIds
 */
exports.getByIds = async (ids) => {
    const params = 'EventId?Id='+ids.reduce((acc, item)=> acc+","+item)
    console.log(params)
    return await api(params)
}

/**
 * Gets a list 100
 * @param {string} lat latitude
 * @param {string} lon longitude
 * @param {string[]} viewed the ids of all the already viewed events
 */
exports.listByLocation = async (lat, lon, viewed) => {
    var list = []
    var page = 1
    var radius = 1000
    while (list.length<100) {
        const params = 'EventLonLatDist?'+location(lat, lon, radius)+'&pagesize='+pageSize+fieldsList(page)
        const result = (await api(params)).result
        console.log(result)
        if(!result || result.length!==pageSize){
            list = []
            page = 0
            radius = radius+1000
        }else{
            list = [...list, ...result]
            page = page+1
        }
    }
    return list
}

