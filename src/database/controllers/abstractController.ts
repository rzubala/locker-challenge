import Player from "../../models/player";
import Event from "../../models/event";
import PlayerEventResult from "../../models/playerEventResult";
import PlayerEventResultRound from "../../models/playerEventResultRound";

export default abstract class AbstractImportController {
    event: Event | undefined
    players: Player[];
    playerEventResults: PlayerEventResult[]
    playerEventResultRounds: PlayerEventResultRound[]

    constructor() {
      this.event = undefined
      this.players = [];
      this.playerEventResults = []
      this.playerEventResultRounds = []
    }

    addEvent = (event: Event) => this.event = event

    addPlayer = (player: Player) => this.players.push(player)

    addPlayerEventResult = (playerEventResult: PlayerEventResult) => this.playerEventResults.push(playerEventResult)
    
    addPlayerEventResultRounds = (playerEventResultRounds: PlayerEventResultRound[] | undefined) => {
      if (!playerEventResultRounds) {
        return
      }
      this.playerEventResultRounds.push(...playerEventResultRounds)
    }

    abstract storeData() : void;
}