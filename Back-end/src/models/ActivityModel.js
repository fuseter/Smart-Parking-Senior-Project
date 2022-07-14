const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    deviceID: {
        type: String,
    },
    MacAddress: {
        type: String,
    },
    uid: {
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
    time: {
        type: Date,
        default: Date.now,
    },
})

const activityModel = mongoose.model('Activity', activitySchema)
module.exports = activityModel
