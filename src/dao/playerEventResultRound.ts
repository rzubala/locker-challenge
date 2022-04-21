import { PoolClient } from 'pg'
import PlayerEventResultRound from '../models/playerEventResultRound'

const getSaveQuery = (playerEventResultRound: PlayerEventResultRound): [string, any[]] => {
    return [
        'INSERT INTO main.player_event_result_round(player_id, event_id, round, score, strikes) VALUES($1, $2, $3, $4, $5) RETURNING *',
        [
            playerEventResultRound.playerId,
            playerEventResultRound.eventId,
            playerEventResultRound.round,
            playerEventResultRound.score,
            playerEventResultRound.strikes
        ],
    ]
}

export const save = async (client: PoolClient, PlayerEventResultRound: PlayerEventResultRound) => {
    const query = getSaveQuery(PlayerEventResultRound)
    return await client.query(query[0], query[1])
}
