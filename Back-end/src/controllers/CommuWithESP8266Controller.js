const express = require('express')
const router = express.Router()
const StatusCode = require('../constants/statusCode')
const message = require('../constants/message')
const { SUCCESS, ERROR_BAD_REQUEST } = StatusCode
const { SUCCESS_MESSAGE, NOT_FOUND_MESSAGE } = message
const { mqttService } = require('../clusterMQTT/ClusterMQTT')
const deviceModel = require('../models/DeviceModel')
const activityModel = require('../models/ActivityModel')

router.post('/parking/active', async (req, res, next) => {
    try {
        const activity = await activityModel.create(req.body)
        const device = await deviceModel.findOneAndUpdate(
            { _id: req.body.deviceID },
            { status: req.body.status },
        )

        if (activity && device) {
            console.log('req ==>', req.body.MacAddress)
            mqttService.client.publish(
                `parking/active/${req.body.MacAddress}`,
                '1',
            )

            return res.status(SUCCESS).json({
                code: SUCCESS,
                message: SUCCESS_MESSAGE,
            })
        }

        return res.status(ERROR_BAD_REQUEST).json({
            code: ERROR_BAD_REQUEST,
            message: NOT_FOUND_MESSAGE,
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router
