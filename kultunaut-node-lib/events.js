const { api } = require('./api-lib.js')

const fieldsList = (page) => '&page=' + page + '&fieldlist=Title,Startdate,Enddate,Tags,Image'
const location = (lat, lon, radius) => 'lat=' + lat + '&lon=' + lon + '&radius=' + radius

const FEED_DEFAULT_LENGTH = 100

/**
 * Show event data for a single event
 * @param {string} id KultunautEventId
 */
exports.getById = async (id) => {
    const params = 'EventId?Id=' + id
    return (await api(params)).result[0]
}

/**
 * Show events data for a list of event id's
 * @param {string[]} ids List of KultunautEventIds
 */
exports.getByIds = async (ids) => {
    const params = 'EventId?Id=' + ids.reduce((acc, item) => acc + "," + item)
    return (await api(params)).result
}

/**
 * Search events by longitude and latitude, order by distance, startdate:
 * 
 * The lenght is dynamic, either it is shorter than 2 x FEED_DEFAULT_LENGTH
 * 
 * @param {string} lat Latitude
 * @param {string} lon Longitude
 * @param {string[]} viewed KultunautEventId list of the already viewed items
 */
exports.listByLocation = async ({ lat, lon, viewed }) => {
    var list = []
    var page = 1
    var radius = 1000
    while (list.length < FEED_DEFAULT_LENGTH) {
        const params = 'EventLonLatDist?' + location(lat, lon, radius) + '&pagesize=' + FEED_DEFAULT_LENGTH + fieldsList(page)
        const result = (await api(params)).result
        if (!result || result.length !== FEED_DEFAULT_LENGTH) {
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
 * Search events by longitude, latitude, radius, start- and end-date. Order by startdate. Get a list of up to 100 items.
 * 
 * @param {string} lat latitude
 * @param {string} lon longitude
 * @param {number} radius theradius
 * @param {string=} enddate how events starting before date, format: dd-mm-yyyy, default current day + 180 days (OPTIONAL)
 * @param {string=} startdate show events ending after date, format: dd-mm-yyyy, default current day (OPTIONAL)
 * @param {(string[])=} categories show events only having one or more of these categories (OPTIONAL)
 */

const LIST_MAX_SIZE = 100

exports.search = async ({ lat, lon, radius, enddate, startdate, categories }) => {
    // Build global params 
    var params = 'EventLonLatDate?' + location(lat, lon, radius)
    if (enddate) params += '&enddate=' + enddate
    if (startdate) params += '&startdate=' + startdate

    var list = []
    var page = 0

    while (list.length < LIST_MAX_SIZE) {
        // Build local params
        const localParams = params + '&pagesize=' + LIST_MAX_SIZE + fieldsList(page)
        const result = ((await api(localParams)).result)
        const filteredList  = result.reduce((acc, item) => {
            if(!item.Tags) return acc
            var predicate = true
            //Check if the event has one or more of the tags we are searching (if we are searching)
            if (categories && categories.length > 0) predicate = ((item.Tags.filter((tag) => categories.includes(tag))).length > 0)
            if(predicate) return[...acc, item]
            else return acc
        }, [])
        list = [...list, ...filteredList]
        if(result.length!==LIST_MAX_SIZE) break;
        else page++
    }
    return list
}
