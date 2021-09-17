require('dotenv').config()
const express = require ('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const auth = require('./config/authentication')
const app = express()

app.use(express.json())
app.get('/', (req, res) => {
     res.json({info: 'Node.js, Express and Postgres API'})
 })

app.post('/register', async (req, res) => {

    try {
        // Get user input
        const {first_name, last_name, email, password} = req.body

        // Validate user inout
        if (!(email && password && last_name && first_name)) {
            res.status(400).send('All input is required')
        }

        // Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10)
        // Create user
        const user = {
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword
        }
        // Create token
        const token = jwt.sign(
            { user_id : user._id, email },
             process.env.JWT_KEY,
            { expiresIn: "2h" })
            console.log(user._id)
            user.token = token
        //
        res.status(201).send(user)

    } catch (err) {



        console.log(err)
    }

})

app.post('/login', async (req, res) => {
    try {

        const {email, password} = req.body

        if (!(email && password)) {
            res.status(400).send('All input is required!')
        }

        const user = {
            email: email.toLowerCase(),
            password
        }

        const token = jwt.sign(
            {user_id: user._id, email},
            process.env.JWT_KEY,
            {
                expiresIn: '2h'
            }
        )
        user.token = token
        res.status(200).json(user)

    } catch (err) {
        console.log(err)
    }
})

app.post('/welcome', auth, (req, res) => {
    res.status(200).send('WELKINGAMO....!')
})

module.exports = app