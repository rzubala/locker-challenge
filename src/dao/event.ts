import { PoolClient } from "pg";
import Event from "../models/event";

export const save = async (client: PoolClient, event: Event | undefined) => {
    if (!event) {
        Promise.reject(new Error("Undefined event"))
    }
    const query = getSaveQuery(event!)
    return await client.query(query[0], query[1])
}

const getSaveQuery = (event: Event): [string, any[]] => ['INSERT INTO main.event(id_event, name) VALUES($1, $2) RETURNING *', [event.id, event.name]]
