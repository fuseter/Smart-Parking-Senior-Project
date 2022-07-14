const express = require('express')
const path = require('path')
const router = express.Router()
const dotenv = require('dotenv')
const { argv } = require('yargs')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const nodemailer = require('nodemailer')
const message = require('../constants/message')
const userModel = require('../models/UserModel')
const hbs = require('nodemailer-express-handlebars')
const StatusCode = require('../constants/statusCode')
const sgTransport = require('nodemailer-sendgrid-transport')

const { ERROR_CONFLICT, CREATED, SUCCESS, ERROR_BAD_REQUEST } = StatusCode
const {
    USER_ALREADY_EXIST,
    INVALID_CREDENTIALS,
    CONFIRM_REGISTER,
    NOT_FOUND_MESSAGE,
    SUCCESS_MESSAGE,
    FORGOT_PASSWORD,
} = message

const {
    NODEMAILER_API_EMAIL,
    BASE_URL,
    TOKEN_KEY,
} = require('../constants/configs')

dotenv.config({ path: argv.env || '.env' })

router.post('/register', async (req, res, next) => {
    try {
        const { name, email, password, role, is_verify, phone } = req.body
        const oldUser = await userModel.findOne({ email })
        if (oldUser) {
            return res.status(ERROR_CONFLICT).send(USER_ALREADY_EXIST)
        }

        const encryptedPassword = await bcrypt.hash(password, 10)
        const user = await userModel.create({
            name,
            email,
            phone,
            role,
            is_verify,
            password: encryptedPassword,
        })

        const token = jwt.sign({ user_id: user._id, email }, TOKEN_KEY)
        user.token = token

        if (user) {
            const tokenVerifyEmail = jwt.sign(
                { user_id: user._id },
                TOKEN_KEY,
                { expiresIn: '1d' },
            )

            const transporter = nodemailer.createTransport(
                sgTransport({
                    auth: {
                        api_key: process.env.SENDGRID_API,
                    },
                }),
            )

            const handlebarOptions = {
                viewEngine: {
                    extName: '.handlebars',
                    partialsDir: path.resolve(__dirname, 'views'),
                    defaultLayout: false,
                },
                viewPath: path.resolve(__dirname, 'views'),
                extName: '.handlebars',
            }

            transporter.use('compile', hbs(handlebarOptions))

            const option = {
                from: NODEMAILER_API_EMAIL,
                to: user.email,
                subject: CONFIRM_REGISTER,
                template: 'confirmemail',
                context: {
                    baseURL: `${BASE_URL}/authentication/verifyEmail?token=${tokenVerifyEmail}`,
                },
            }

            transporter.sendMail(option, (err, info) => {
                if (err) {
                    console.log('Email error ==>', err)
                    return res.status(ERROR_BAD_REQUEST).send(NOT_FOUND_MESSAGE)
                } else {
                    return res.status(CREATED).json(user)
                }
            })
        }
    } catch (error) {
        next(error)
    }
})

router.get('/verifyEmail', (req, res, next) => {
    try {
        const { token } = req.query
        if (token) {
            jwt.verify(token, TOKEN_KEY, async (error, decoded) => {
                if (!error) {
                    const verifyemail = await userModel.findOneAndUpdate(
                        {
                            _id: decoded.user_id,
                        },
                        { $set: { is_verify: true } },
                        { new: true },
                    )

                    if (verifyemail) {
                        res.sendFile(__dirname + '/index.html')
                    } else {
                        return res
                            .status(ERROR_BAD_REQUEST)
                            .send(NOT_FOUND_MESSAGE)
                    }
                }
            })
        }
    } catch (error) {
        next(error)
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const { email, password, role } = req.body

        const user = await userModel.findOne({
            $and: [{ email: email }, { role: role }, { is_verify: true }],
        })

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ user_id: user._id, email }, TOKEN_KEY)
            user.token = token
            return res.status(SUCCESS).send(user)
        }

        return res.status(ERROR_BAD_REQUEST).send(INVALID_CREDENTIALS)
    } catch (error) {
        next(error)
    }
})

router.post('/updateProfile', async (req, res, next) => {
    try {
        const { phone, name, uid } = req.body
        const userUpdateProfile = await userModel.findOneAndUpdate(
            { _id: uid },
            { $set: { name: name, phone: phone } },
        )
        if (userUpdateProfile) {
            return res.status(SUCCESS).send(SUCCESS_MESSAGE)
        }
        return res.status(ERROR_BAD_REQUEST).send(NOT_FOUND_MESSAGE)
    } catch (error) {
        next(error)
    }
})

router.get('/userProfile/:_id', async (req, res, next) => {
    try {
        const { _id } = req.params
        const userprofile = await userModel.findOne({ _id })
        if (userprofile) {
            return res.status(SUCCESS).json(userprofile)
        }

        return res.status(ERROR_BAD_REQUEST).send(NOT_FOUND_MESSAGE)
    } catch (error) {
        next(error)
    }
})

// -----------admin-------------
router.get('/allUser', async (req, res, next) => {
    try {
        const alluser = await userModel.find()

        if (alluser) {
            return res.status(SUCCESS).json({
                code: SUCCESS,
                message: SUCCESS_MESSAGE,
                data: alluser,
            })
        }

        return res.status(ERROR_BAD_REQUEST).send(NOT_FOUND_MESSAGE)
    } catch (error) {
        next(error)
    }
})

router.delete('/deleteUser/:uid', async (req, res, next) => {
    try {
        const deleteuser = await userModel.findOneAndDelete({
            _id: req.params.uid,
        })
        if (deleteuser) {
            return res.status(SUCCESS).send(SUCCESS_MESSAGE)
        }
        return res.status(ERROR_BAD_REQUEST).send(NOT_FOUND_MESSAGE)
    } catch (error) {
        next(error)
    }
})

router.get('/AllAmountUser', async (req, res, next) => {
    try {
        const allUser = await userModel.countDocuments()

        if (allUser) {
            return res.status(SUCCESS).json({
                code: SUCCESS,
                message: SUCCESS_MESSAGE,
                data: allUser,
            })
        }

        return res.status(ERROR_BAD_REQUEST).send(NOT_FOUND_MESSAGE)
    } catch (error) {
        next(error)
    }
})

router.get('/getOneUser/:uid', async (req, res, next) => {
    try {
        const user = await userModel.findOne({ _id: req.params.uid })

        if (user) {
            return res.status(SUCCESS).json({
                code: SUCCESS,
                message: SUCCESS_MESSAGE,
                data: user,
            })
        }

        return res.status(ERROR_BAD_REQUEST).send(NOT_FOUND_MESSAGE)
    } catch (error) {
        next(error)
    }
})

router.post('/editUserProfile', async (req, res, next) => {
    try {
        const user = await userModel.findOneAndUpdate(
            { _id: req.body._id },
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    role: req.body.role,
                    is_verify: req.body.is_verify,
                    phone: req.body.phone,
                },
            },
        )

        if (user) {
            return res.status(SUCCESS).send(SUCCESS_MESSAGE)
        }

        return res.status(ERROR_BAD_REQUEST).send(NOT_FOUND_MESSAGE)
    } catch (error) {
        next(error)
    }
})

module.exports = router
