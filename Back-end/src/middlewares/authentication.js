const jwt = require('jsonwebtoken')
const StatusCode = require('../constants/statusCode')
const message = require('../constants/message')
const { NO_HEADERS, NO_TOKEN, FAIL_VERIFY_TOKEN } = message
const { ERROR_UNAUTHORIZED } = StatusCode
const { TOKEN_KEY } = require('../constants/configs')

const authentication = (req, res, next) => {
    try {
        if (!req.headers) {
            return res.status(ERROR_UNAUTHORIZED).send({
                code: ERROR_UNAUTHORIZED,
                message: NO_HEADERS,
            })
        }

        const access_token = req.headers.authorization
        if (!access_token) {
            return res.status(ERROR_UNAUTHORIZED).send({
                code: ERROR_UNAUTHORIZED,
                message: NO_TOKEN,
            })
        }

        jwt.verify(access_token, TOKEN_KEY, (error, decoded) => {
            if (error) {
                return res.status(ERROR_UNAUTHORIZED).send({
                    code: ERROR_UNAUTHORIZED,
                    message: FAIL_VERIFY_TOKEN,
                })
            }
            req.user = decoded
            next()
        })
    } catch (error) {
        return res.status(ERROR_UNAUTHORIZED).send({
            code: ERROR_UNAUTHORIZED,
            message: FAIL_VERIFY_TOKEN,
        })
    }
}

module.exports = authentication
