const StudentAppError = require("./StudentAppError");
const { StatusCodes } = require('http-status-codes')

class UnauthorizedError extends StudentAppError {
    constructor(specificMessage) {
        super("Unauthorized Access",
            "Unauthorized Error",
            StatusCodes.UNAUTHORIZED,
            specificMessage
        )
    }
}
module.exports = UnauthorizedError