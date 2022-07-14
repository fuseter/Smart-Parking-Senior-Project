const express = require('express')
const router = express.Router()
const middleware = require('../middlewares/authentication')

const device = require('./device')
const authentication = require('./authentication')
const commuWithESP8266 = require('./CommunicateWithESP8266')
const activity = require('./activity')

router.use(commuWithESP8266)
router.use(authentication)
router.use(activity)
router.use(device)

module.exports = router
