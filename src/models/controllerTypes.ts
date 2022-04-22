export type RequestParams = {
    eventId: number
    playerName?: string
}

export type SortDirection = 'asc' | 'desc'

export type RequestQuery = {
    limit?: string
    skip?: string
    sort?: string
    dir?: SortDirection
}
