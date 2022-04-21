export type JsonAthlete = {
    id: string,
    displayName: string
}

export type JsonStatusPosition = {
    id: string,
    displayName: string
}

export type JsonStatus = {
    period: number,    
    position: Partial<JsonStatusPosition>,
}

export type JsonScore = {
    value: number,
    displayValue: string
}

type JsonRound = {
    period: number
}

export type JsonLineScore = JsonScore & JsonRound

export type JsonCompetitor = {
    athlete: Partial<JsonAthlete>,
    status: Partial<JsonStatus>,
    score: Partial<JsonScore>,
    linescores: Partial<JsonLineScore>[]
}