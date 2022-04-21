import { JsonCompetitor, JsonLineScore } from './jsonTypes'
import Event from './event'

export default class PlayerEventResultRound {
    private _playerId: number
    private _eventId: number
    private _round: number
    private _score: string
    private _strikes: number

    constructor(
        playerId: number,
        eventId: number,
        round: number,
        score: string,
        strikes: number
    ) {
        this._eventId = eventId
        this._playerId = playerId
        this._round = round
        this._score = score
        this._strikes = strikes
    }

    public get playerId(): number {
        return this._playerId
    }
    public get eventId(): number {
        return this._eventId
    }
    public get round(): number {
        return this._round
    }
    public get score(): string {
        return this._score
    }
    public get strikes(): number {
        return this._strikes
    }
    static from(event: Event, data: Partial<JsonCompetitor> | undefined): PlayerEventResultRound[] | undefined {
        if (!data?.athlete?.id) {
            throw new Error('Athelete does not have id')
        }
        const playerId = +data.athlete.id
        return data.linescores?.map((linescore: Partial<JsonLineScore>) => {
            if (linescore.period === undefined) {
                throw new Error('Linescore does not have period')
            }
            const score: string = linescore.displayValue || ''
            const strikes: number = linescore.value || 0
            const round: number = linescore.period!
            return new PlayerEventResultRound(
                playerId,
                event.id,
                round,
                score,
                strikes
            )
        })
    }
}
