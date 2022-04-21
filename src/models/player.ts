import { JsonAthlete } from "./jsonTypes"
import PlayerEventResult from "./playerEventResult"

export default class Player {
    private _id: number
    private _name: string

    constructor(id: number, name: string) {
        this._id = id
        this._name = name
    }
    
    static from(athlete: Partial<JsonAthlete> | undefined): Player {
        if (!athlete?.id) {
            throw new Error("Athelete does not have id")
        }
        return new Player(+athlete.id, athlete.displayName || "")
    }

    public get id(): number {
        return this._id
    }

    public get name(): string {
        return this._name
    }
}