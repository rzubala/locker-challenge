import { SortDirection } from "../models/controllerTypes"

const buildScoreExpression = (column: string): string => `NULLIF(regexp_replace(${column}, 'E', '9999', 'g'), '')::int`

const defaultSecondExpression = ', p.name ASC'
const buildOrderBy = (expression: string, direction: string, secondExpression: string = defaultSecondExpression): string => ` ORDER BY ${expression} ${direction} ${secondExpression} `

export const MAX_ROUNDS = 4
export const buildRoundSelect = (rounds: number) => Array.from({length: rounds}, (_, i) => i + 1).map(r => {
    return `round.strikes[${r}] as round${r}_strike, round.score[${r}] as round${r}_score`
})

export const addSort = (sortColumn?: number, sortDirection?: SortDirection): string => {
    const defaultColumn = 'per.position_id'
    const direction = sortDirection?.toLowerCase() === 'desc' ? 'DESC' : 'ASC'
    if (!sortColumn) {
        return buildOrderBy(defaultColumn, direction)
    }
    switch (+sortColumn) {
        case 1:
            return buildOrderBy(defaultColumn, direction)
        case 2:
            return buildOrderBy('p.name', direction, '')
        case 3:
            return buildOrderBy(buildScoreExpression('per.total_score'), direction)
        case 4:
            return buildOrderBy('round.strikes[1]', direction)
        case 5:
            return buildOrderBy(buildScoreExpression('round.score[1]'), direction)
        case 6:
            return buildOrderBy('round.strikes[2]', direction)
        case 7:
            return buildOrderBy(buildScoreExpression('round.score[2]'), direction)
        case 8:
            return buildOrderBy('round.strikes[3]', direction)
        case 9:
            return buildOrderBy(buildScoreExpression('round.score[3]'), direction)
        case 10:
            return buildOrderBy('round.strikes[4]', direction)
        case 11:
            return buildOrderBy(buildScoreExpression('round.score[4]'), direction)
        case 12:
            return buildOrderBy('per.total_strikes', direction)
        default:
            return buildOrderBy(defaultColumn, direction)
    }
}
