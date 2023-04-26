export const mysql = require('serverless-mysql')({
    config: {
        host: process.env.HOSTNAME,
        database: process.env.DATABASE,
        user: process.env.USER,
        password: process.env.PASSWORD
    }
})