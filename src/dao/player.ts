import { PoolClient } from 'pg'
import Player from "../models/player";

export const save = async (client: PoolClient, player: Player) => {
    const query = getSaveQuery(player)
    return await client.query(query[0], query[1])
}

const getSaveQuery = (player: Player): [string, any[]] => ['INSERT INTO main.player(id_player, name) VALUES($1, $2) RETURNING *', [player.id, player.name]]
