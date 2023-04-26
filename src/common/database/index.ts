export const mysql = require('serverless-mysql')({
    config: {
        host: "localhost",
        database: "arithmeticdb",
        user: "userA",
        password: "userA123"
    }
})