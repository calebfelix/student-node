const StudentAppError = require("./StudentAppError");
const { StatusCodes } = require('http-status-codes')

class ValidationError extends StudentAppError {
    constructor(specificMessage) {
        super("Check your sent parameters",
            "Validation Error ",
            StatusCodes.BAD_REQUEST,
            specificMessage
        )

    }

}
module.exports = ValidationError