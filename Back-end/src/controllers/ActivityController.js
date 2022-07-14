const express = require('express')
const router = express.Router()
const StatusCode = require('../constants/statusCode')
const message = require('../constants/message')
const { SUCCESS, ERROR_NOT_FOUND } = StatusCode
const { SUCCESS_MESSAGE, NOT_FOUND_MESSAGE } = message
const activityModel = require('../models/ActivityModel')

router.post('/allActivity', async (req, res, next) => {
    try {
        const { uid } = req.body
        const allActivityData = await activityModel
            .find({ uid })
            .sort({ time: -1 })
        if (allActivityData.length !== 0) {
            return res.status(200).json({
                code: SUCCESS,
                message: SUCCESS_MESSAGE,
                data: allActivityData,
            })
        }
        return res.status(404).json({
            code: ERROR_NOT_FOUND,
            message: NOT_FOUND_MESSAGE,
        })
    } catch (error) {
        next(error)
    }
})

router.get('/ParkingActivity/:uid', async (req, res, next) => {
    try {
        const { uid } = req.params
        const allActivityData = await activityModel.findOne({
            $and: [{ uid: uid }, { status: 1 }],
        })

        if (allActivityData) {
            return res.status(200).json({
                code: SUCCESS,
                message: SUCCESS_MESSAGE,
                data: allActivityData,
            })
        }

        return res.status(204).json({
            code: 204,
            message: NOT_FOUND_MESSAGE,
        })
    } catch (error) {
        next(error)
    }
})

// ---------Admin--------
router.get('/adminAllActivity', async (req, res, next) => {
    try {
        const adminAllActivity = await activityModel.find()

        if (adminAllActivity) {
            return res.status(SUCCESS).json({
                code: SUCCESS,
                message: SUCCESS_MESSAGE,
                data: adminAllActivity,
            })
        }

        return res.status(ERROR_NOT_FOUND).send(NOT_FOUND_MESSAGE)
    } catch (error) {
        next(error)
    }
})

router.get('/AllAmountActivity', async (req, res, next) => {
    try {
        const amountActivity = await activityModel.countDocuments()

        if (amountActivity) {
            return res.status(SUCCESS).json({
                code: SUCCESS,
                message: SUCCESS_MESSAGE,
                data: amountActivity,
            })
        }

        return res.status(ERROR_NOT_FOUND).send(NOT_FOUND_MESSAGE)
    } catch (error) {
        next(error)
    }
})

module.exports = router
