/**
 * Standardized API response helper.
 * Ensures all responses follow a consistent envelope format.
 */
class ApiResponse {
  /**
   * Send a success response
   * @param {object} res - Express response object
   * @param {number} statusCode - HTTP status code
   * @param {string} message - Success message
   * @param {*} data - Response data
   * @param {object} [meta] - Pagination or other metadata
   */
  static success(res, statusCode = 200, message = 'Success', data = null, meta = null) {
    const response = {
      success: true,
      message,
    };

    if (data !== null) {
      response.data = data;
    }

    if (meta !== null) {
      response.meta = meta;
    }

    return res.status(statusCode).json(response);
  }

  /**
   * Send a created response (201)
   */
  static created(res, message = 'Created successfully', data = null) {
    return ApiResponse.success(res, 201, message, data);
  }

  /**
   * Send a no content response (204)
   */
  static noContent(res) {
    return res.status(204).send();
  }

  /**
   * Send an error response
   * @param {object} res - Express response object
   * @param {number} statusCode - HTTP status code
   * @param {string} message - Error message
   * @param {*} [errors] - Validation errors or additional details
   */
  static error(res, statusCode = 500, message = 'Error', errors = null) {
    const response = {
      success: false,
      message,
    };

    if (errors !== null) {
      response.errors = errors;
    }

    return res.status(statusCode).json(response);
  }
}

module.exports = ApiResponse;
