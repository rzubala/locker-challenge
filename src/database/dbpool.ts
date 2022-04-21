import { Pool } from 'pg';

const user = process.env.DB_USER || 'locker'
const password = process.env.DB_PASSWORD || 'locker'
const database = process.env.DATABASE_NAME || 'locker'
const databasePort = process.env.DATABASE_PORT || 15432
const hostname = process.env.DATABASE_URL || 'localhost'

export default new Pool ({
    max: 20,
    connectionString: `postgres://${user}:${password}@${hostname}:${databasePort}/${database}`,
    idleTimeoutMillis: 30000
});