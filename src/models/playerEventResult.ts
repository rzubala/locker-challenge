import { JsonCompetitor } from './jsonTypes'
import Event from './event'

export default class PlayerEventResult {
    private _playerId: number
    private _eventId: number
    private _totalScore: string
    private _position: string
    private _positionId: number
    private _totalStrikes: number

    constructor(
        playerId: number,
        eventId: number,
        totalScore: string,
        position: string,
        positionId: number,
        totalStrikes: number,
    ) {
        this._eventId = eventId
        this._playerId = playerId
        this._totalScore = totalScore
        this._position = position
        this._positionId = positionId
        this._totalStrikes = totalStrikes
    }

    public get playerId(): number {
        return this._playerId
    }
    public get eventId(): number {
        return this._eventId
    }
    public get totalScore(): string {
        return this._totalScore
    }
    public get totalStrikes(): number {
        return this._totalStrikes
    }
    public get position(): string {
        return this._position
    }
    public get positionId(): number {
        return this._positionId
    }

    static from(event: Event, data: Partial<JsonCompetitor> | undefined): PlayerEventResult {
        if (!data?.athlete?.id || !data?.status?.position?.id) {
            throw new Error('Results does not have id')
        }
        const position: string = data.status?.position?.displayName || ''
        const positionId: number = +data.status.position.id
        const totalScore: string = data.score?.displayValue || ''
        const totalStrikes: number = data.score?.value || 0
        return new PlayerEventResult(
            +data.athlete.id,
            +event.id,
            totalScore,
            position,
            positionId,
            totalStrikes
        )
    }
}
