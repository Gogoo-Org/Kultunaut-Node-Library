export type KultunautEvent = {
    Id: number
    Title: string
    Startdate: string
    Enddate: string
    Starttime:string
    Time:string
    Tags: string[]
    Image: string
    LocationName: string
    LocationAddress:string
    LocationCity: string
    LocationZip: number
    Link: string
    Ticket?:string
}


export type KultunautDetailedEvent = {
    Id: number
    Changed: number
    Enddate: string
    Fee: string
    Ticket?:string
    Lat: number
    Link: string
    LocationAddress: string
    LocationCity: string
    LocationCountry: string
    LocationId: number
    LocationName: string
    LocationZip: number
    Lon: number
    Startdate: string
    Starttime: string
    Tags: string[]
    Target: string
    Time: string
    Title: string
}