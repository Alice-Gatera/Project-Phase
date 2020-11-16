/* eslint-disable require-jsdoc */
import ApplicationError from './applicationError';

class UnauthorizedError extends ApplicationError {
  constructor(message) {
    super(message, 401);
  }
}

export default UnauthorizedError;
