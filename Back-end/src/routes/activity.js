const express = require('express')
const router = express.Router()
const ActivityController = require('../controllers/ActivityController')

router.use('/activity', ActivityController)

module.exports = router
