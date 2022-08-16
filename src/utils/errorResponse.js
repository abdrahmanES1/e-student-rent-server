
class ErrorResponse extends Error {
    /**
     * 
     * @param {String} message 
     * @param {Number} statusCode 
     */
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorResponse;