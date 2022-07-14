const express = require('express')
const router = express.Router()
const DevicesController = require('../controllers/DevicesController')

router.use('/device', DevicesController)

module.exports = router
