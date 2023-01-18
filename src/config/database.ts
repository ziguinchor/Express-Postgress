import { Client, Pool } from 'pg'
import dotenv from 'dotenv'
dotenv.config()


export const client = new Client({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: 5432,
})

