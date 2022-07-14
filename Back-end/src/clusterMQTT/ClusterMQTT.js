const mqtt = require('mqtt')
const deviceModel = require('../models/DeviceModel')
const activityModel = require('../models/ActivityModel')
const statusCode = require('../constants/statusCode')
const message = require('../constants/message')
const { MQTT_HOST, MQTT_PORT } = require('../constants/configs')

function mqttService() {
    var options = {
        host: MQTT_HOST,
        port: MQTT_PORT,
        protocol: '',
        username: '',
        password: '',
    }

    mqttService.client = mqtt.connect(options)

    mqttService.client.on('connect', () => {
        console.log('MQTT Connected')
    })

    mqttService.client.on('error', error => {
        console.log(error)
    })

    mqttService.client.subscribe('parking/inActive')

    mqttService.client.on('message', async (topic, message) => {
        console.log('Received message:', topic, message.toString())

        if (topic === 'parking/inActive') {

            const device = await deviceModel.findOneAndUpdate({ MacAddress: message.toString() },{ $set: { status: 0 } },)
            const activity = await activityModel.findOneAndUpdate({$and: [{ MacAddress: message.toString() }, { status: 1 }],},{ $set: { status: 0 } },)

            
        }
    })
}

exports.mqttService = mqttService
