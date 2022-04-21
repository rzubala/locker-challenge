export type RequestParams = {
    eventId: number
    playerName?: string
}

export type SortDirection = 'asc' | 'desc'

export type RequestQuery = {
    limit?: number
    skip?: number
    sort?: number
    dir?: SortDirection
}
