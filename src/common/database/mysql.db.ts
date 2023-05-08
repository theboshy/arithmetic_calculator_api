export class MysqlInstance {

    private static instance: any;

    private constructor(){}

    static getInstance() {
        if(!this.instance){
            const mysql = require('serverless-mysql')({
                config: {
                    host: process.env.HOSTNAME,
                    database: process.env.DATABASE,
                    user: process.env.USER,
                    password: process.env.PASSWORD
                }
            })
            this.instance = mysql;
        }
        return this.instance
    }
}

/*export const mysql = require('serverless-mysql')({
    config: {
        host: process.env.HOSTNAME,
        database: process.env.DATABASE,
        user: process.env.USER,
        password: process.env.PASSWORD
    }
})*/