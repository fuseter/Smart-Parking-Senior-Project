const express = require('express')
const router = express.Router()
const deviceModel = require('../models/DeviceModel')
const StatusCode = require('../constants/statusCode')
const message = require('../constants/message')
const { SUCCESS, ERROR_BAD_REQUEST, ERROR_CONFLICT } = StatusCode
const { SUCCESS_MESSAGE, NOT_FOUND_MESSAGE } = message

router.get('/allDevice', async (req, res, next) => {
    try {
        const allDeviceData = await deviceModel.find().sort({ status: 1 })
        if (allDeviceData) {
            return res.status(SUCCESS).json({
                code: SUCCESS,
                message: SUCCESS_MESSAGE,
                data: allDeviceData,
            })
        }
    } catch (error) {
        next(error)
    }
})

router.post('/register-device', async (req, res, next) => {
    try {
        const oldDevice = await deviceModel.findOne({ MacAddress: req.body.MacAddress,})

        if (oldDevice) {
            return res.status(ERROR_CONFLICT).send(NOT_FOUND_MESSAGE)
        }

        const device = await deviceModel.create(req.body)

        if (device) {
            return res.status(SUCCESS).json({
                code: SUCCESS,
                message: SUCCESS_MESSAGE,
                data: device,
            })
        }
    } catch (error) {
        next(error)
    }
})

router.post('/updateDevice', async (req, res, next) => {
    try {
        const updatedevice = await deviceModel.findOneAndUpdate(
            { _id: req.body._id },
            {
                $set: {
                    MacAddress: req.body.MacAddress,
                    title: req.body.title,
                    description: req.body.description,
                    status: req.body.status,
                    lat: req.body.lat,
                    long: req.body.long,
                },
            },
        )

        if (updatedevice) {
            return res.status(SUCCESS).json(SUCCESS_MESSAGE)
        }

        return res.status(ERROR_BAD_REQUEST).send(NOT_FOUND_MESSAGE)
    } catch (error) {
        next(error)
    }
})

router.delete('/deleteDevice/:deviceID', async (req, res, next) => {
    try {
        const deletedevice = await deviceModel.deleteOne({
            _id: req.params.deviceID,
        })

        if (deletedevice) {
            return res.status(SUCCESS).send(SUCCESS_MESSAGE)
        }

        return res.status(ERROR_BAD_REQUEST).send(NOT_FOUND_MESSAGE)
    } catch (error) {
        next(error)
    }
})

router.get('/AllAmountDevice', async (req, res, next) => {
    try {
        const amountDevice = await deviceModel.countDocuments()

        if (amountDevice) {
            return res.status(SUCCESS).json({
                code: SUCCESS,
                message: SUCCESS_MESSAGE,
                data: amountDevice,
            })
        }

        return res.status(ERROR_BAD_REQUEST).send(NOT_FOUND_MESSAGE)
    } catch (error) {
        next(error)
    }
})

router.get('/getOneDevice/:deviceID', async (req, res, next) => {
    try {
        const device = await deviceModel.findOne({ _id: req.params.deviceID })

        if (device) {
            return res.status(SUCCESS).json({
                code: SUCCESS,
                message: SUCCESS_MESSAGE,
                data: device,
            })
        }

        return res.status(ERROR_BAD_REQUEST).send(NOT_FOUND_MESSAGE)
    } catch (error) {
        next(error)
    }
})

module.exports = router
