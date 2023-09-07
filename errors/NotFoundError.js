const StudentAppError = require("./StudentAppError");
const { StatusCodes } = require('http-status-codes')

class NotFoundError extends StudentAppError {
    constructor(specificMessage) {
        super("Record Not FOund",
            "Not FOund Error",
            StatusCodes.NOT_FOUND, specificMessage)
    }
}
module.exports = NotFoundError