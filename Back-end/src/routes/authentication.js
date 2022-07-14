const express = require('express')
const router = express.Router()
const AuthenticationController = require('../controllers/AuthenticationController')

router.use('/authentication', AuthenticationController)

module.exports = router
