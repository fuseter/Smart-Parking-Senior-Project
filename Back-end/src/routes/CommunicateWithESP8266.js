const express = require('express')
const router = express.Router()
const CommunicateController = require('../controllers/CommuWithESP8266Controller')

router.use('/iot' , CommunicateController)

module.exports = router