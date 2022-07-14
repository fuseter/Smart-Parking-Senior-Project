const express = require('express')
const app = express()
const dotenv = require('dotenv')
const route = require('./routes')
const { argv } = require('yargs')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const { mqttService } = require('./clusterMQTT/ClusterMQTT')
// const http = require('http')
// const server = http.createServer(app)

const server = require('http').createServer(app)
const webSocket = require('ws')
const wss = new webSocket.Server({ server: server })
const activityModel = require('./models/ActivityModel')

dotenv.config({ path: argv.env || '.env' })

mongoose.connect(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const PORT = process.env.PORT || 3000
const HOST = process.env.HOST || '0.0.0.0'

mqttService()

const db = mongoose.connection
db.on('error', error => console.log(error))
db.once('open', () => console.log('Database Connected'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Headers', '*')
    next()
})



wss.on('connection', function connection(ws) {
    console.log('new Client ws Connect...')
    ws.on('message', async function message(data) {
        const received = JSON.parse(data)
        const activityData = await activityModel.findOne({ $and: [{ uid: received.uid }, { status: 1 }]})

        if(activityData){
            ws.send(JSON.stringify(activityData))
        }else{
            const activityInactiveData = await activityModel.findOne({ $and: [{ uid: received.uid }, { status: 0 }]})
            if(activityInactiveData){
                ws.send(JSON.stringify(activityInactiveData))
            }
       
        }
     
    })

})

app.use(route)

server.listen(PORT, HOST, () => {
    console.log('server is running...')
})
