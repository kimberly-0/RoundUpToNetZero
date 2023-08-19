const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const express = require('express')
const app = express()
const path = require('path')
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

dotenv.config()
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(bodyParser.json())
app.use(cookieParser())

const apiRouter = require('./api/api')
app.use('/api', apiRouter)  

app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen({
    port: 3001
}, () => {
    console.log(`Your server is running on port 3001`)
})

module.exports = app

// send user ID to front end since cookies do not work for cross-domain deployment (in case of deployment of client and server on a single domain, remove the code below
apiRouter.get("/getUserId",  async (req, res) => {
    const CURRENT_USER_ID = (
        await prisma.user.findFirst({ where: { name: 'John Doe' } }).then(user => {
            return user.id
        }).catch(error => {
            console.log(error)
            return
        })
    ) 

    return res.status(200).json(CURRENT_USER_ID);
})