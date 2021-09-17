const Pool = require('pg').Pool
require('dotenv').config()
const {PORT, DB_HOST, DB_USERNAME, DB_PASSWORD, DATABASE} = process.env


const pool = new Pool({
    database: DATABASE,
    host: DB_HOST,
    port: PORT,
    user: DB_USERNAME,
    password: DB_PASSWORD,

})

module.exports = pool