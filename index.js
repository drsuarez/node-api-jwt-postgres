const http = require('http')
const app = require('./app')
const server = http.createServer(app)

const {DB_HOST} = process.env
const {API_PORT} = process.env
const port = process.env.port || API_PORT

server.listen(port, () => {
    console.log(`App is listening at http://${DB_HOST}:${port}`)
})