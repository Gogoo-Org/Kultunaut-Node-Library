import { api } from "./api-lib"
import { KultunautDetailedEvent, KultunautEvent } from "./types"

const fieldsList = (page: number) => '&page=' + page + '&fieldlist=Title,Startdate,Enddate,Tags,Image,LocationName,Link,Ticket,LocationAddress,LocationCity,LocationZip,Starttime,Time'
const location = (lat: string, lon: string, radius: number) => 'lat=' + lat + '&lon=' + lon + '&radius=' + radius

const FEED_DEFAULT_LENGTH = 100

/**
 * Show event data for a single event
 * @param {string} id KultunautEventId
 */
export async function getById(id: string): Promise<KultunautDetailedEvent> {
    const params = 'EventId?Id=' + id
    return (await api(params))[0] || undefined
}

/**
 * Show events data for a list of event id's
 * @param {string[]} ids List of KultunautEventIds
 */
export async function getByIds(ids: string[]): Promise<KultunautDetailedEvent[]> {
    const params = 'EventId?Id=' + ids.reduce((acc, item) => acc + "," + item)
    return await api(params)
}



type ListByLocationParams = {
    lat: string
    lon: string
    viewed: number[]
}
/**
 * Search events by longitude and latitude, order by distance, startdate:
 * 
 * The lenght is dynamic, either it is shorter than 2 x FEED_DEFAULT_LENGTH
 * 
 * @param {string} lat Latitude
 * @param {string} lon Longitude
 * @param {number[]} viewed KultunautEventId list of the already viewed items
 */
export async function listByLocation({ lat, lon, viewed }: ListByLocationParams): Promise<KultunautEvent[]> {
    var list: KultunautEvent[] = []
    var page = 1
    var radius = 1000
    while (list.length < FEED_DEFAULT_LENGTH) {
        const params = 'EventLonLatDist?' + location(lat, lon, radius) + '&pagesize=' + FEED_DEFAULT_LENGTH + fieldsList(page)
        const result: KultunautEvent[] = await api(params)

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

const LIST_MAX_SIZE = 100

type SearchParams = {
    lat: string
    lon: string
    radius: number
    enddate?: string
    startdate?: string
    categories?: string[]
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
export async function search({ lat, lon, radius, enddate, startdate, categories }: SearchParams): Promise<KultunautEvent[]> {
    // Build global params 
    var params = 'EventLonLatDate?' + location(lat, lon, radius)
    if (enddate) params += '&enddate=' + enddate
    if (startdate) params += '&startdate=' + startdate

    var list: KultunautEvent[] = []
    var page = 0

    while (list.length < LIST_MAX_SIZE) {
        // Build local params
        const localParams = params + '&pagesize=' + LIST_MAX_SIZE + fieldsList(page)
        const result: KultunautEvent[] = await api(localParams)
        const filteredList = result.reduce((acc: KultunautEvent[], item: KultunautEvent) => {
            //Some result might have malformed Tags
            if (!item.Tags) return acc
            var predicate = true
            //Check if the event has one or more of the tags we are searching (if we are searching)
            if (categories && categories.length > 0) predicate = ((item.Tags.filter((tag) => categories.includes(tag))).length > 0)
            if (predicate) return [...acc, item]
            else return acc
        }, [])
        list = [...list, ...filteredList]
        if (result.length !== LIST_MAX_SIZE) break;
        else page++
    }
    return list
}
