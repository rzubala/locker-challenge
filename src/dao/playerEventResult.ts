import { PoolClient } from 'pg'
import pool from '../database/dbpool'
import { SortDirection } from '../models/controllerTypes'
import PlayerEventResult from '../models/playerEventResult'
import { addSort, buildRoundSelect, MAX_ROUNDS } from './utils'

const getSaveQuery = (
    playerEventResult: PlayerEventResult
): [string, (string | number)[]] => {
    return [
        'INSERT INTO main.player_event_result(player_id, event_id, total_score, position, position_id, total_strikes) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
        [
            playerEventResult.playerId,
            playerEventResult.eventId,
            playerEventResult.totalScore,
            playerEventResult.position,
            playerEventResult.positionId,
            playerEventResult.totalStrikes,
        ],
    ]
}

export const save = async (client: PoolClient, playerEventResult: PlayerEventResult) => {
    const query = getSaveQuery(playerEventResult)
    return await client.query(query[0], query[1])
}

export const retrieveResults = async (eventId: number, playerName: string | undefined, limit: number | undefined, skip: number | undefined, sortColumn: number | undefined, sortDirection: SortDirection | undefined) => {
    const values: (string | number)[] = [eventId]
    let paramCnt = 2
    let personFilter = '' 
    if (playerName) {
        values.push(`%${playerName.toLowerCase()}%`)
        personFilter = ` and LOWER(p.name) like $${paramCnt++} `
    }   
    let pagination = ''
    if (limit) {
        values.push(limit)
        pagination += ` LIMIT $${paramCnt++}`
    }
    if (skip) {
        values.push(skip)
        pagination += ` OFFSET $${paramCnt++}`
    }
    const orderBy = addSort(sortColumn, sortDirection)

    const queryStr = `SELECT per.position, p.name,  per.total_score, ${buildRoundSelect(MAX_ROUNDS)}, per.total_strikes 
        FROM main.player_event_result per
        LEFT JOIN main.player p ON p.id_player = per.player_id
        LEFT JOIN LATERAL (
            SELECT array_agg(perr.strikes) AS strikes, array_agg(perr.score) AS score
            FROM main.player_event_result_round perr
            WHERE  perr.player_id = p.id_player and perr.event_id = per.event_id
            ) round ON 1=1
        WHERE per.event_id = $1
        ${personFilter}
        ${orderBy}
        ${pagination}`
    
    let client: PoolClient | undefined = undefined
    try {
        client = await pool.connect()
        return (await client.query(queryStr, values)).rows
    } catch (error) {
        throw error
    } finally {
        client?.release()
    }
}
