const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const deviceSchema = new mongoose.Schema({
    MacAddress: {
        type: String,
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: Number,
    },
    lat: {
        type: String,
    },
    long: {
        type: String,
    },
})

const deviceModel = mongoose.model('Device', deviceSchema)
module.exports = deviceModel
