const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    phone: {
        type: String,
    },
    role: {
        type: String,
    },
    token: {
        type: String,
    },
    is_verify: {
        type: Boolean,
    },
})

const userModel = mongoose.model('User', userSchema)
module.exports = userModel
