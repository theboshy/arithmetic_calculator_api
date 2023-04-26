export const mysql = require('serverless-mysql')({
    config: {
        host: process.env.hostname,
        database: process.env.database,
        user: process.env.user,
        password: process.env.password
    }
})