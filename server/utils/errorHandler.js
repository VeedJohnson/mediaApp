class ApiError extends Error {
  /**
   *
   * @param {string} message your custom error message
   * @param {number} statusCode your error status code
   */
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${this.statusCode}`.startsWith('4') ? 'error' : 'fail';

    Error.captureStackTrace = (this, this.constructor);
  }
}

module.exports = ApiError;
