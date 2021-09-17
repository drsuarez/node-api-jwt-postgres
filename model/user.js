const database = require('../config/database')

const userCreate = database.query("SELECT * FROM users", (err, res) => {
    
})