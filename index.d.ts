

export type KultunautEvent = {
    Id: number
    Title: string
    Startdate: string
    Enddate: string
    Tags: string[]
    Image: string
}

export type KultunautDetailedEvent = {
    Id: number
    Changed: number
    Enddate: string
    Fee: string
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


export function getById(params: string): Promise<KultunautDetailedEvent>;

export function getByIds(params: string[]): Promise<KultunautDetailedEvent[]>;


type ListByLocationParams = {
    lat: string
    lon: string
    viewed: string[]
}

export function listByLocation(params: ListByLocationParams): Promise<KultunautEvent[]>;

type SearchParams = {
    lat: string
    lon: string
    radius: number
    enddate?: string
    startdate?: string
    categories?: string[]
}

export function search(params: SearchParams): Promise<KultunautEvent[]>;
