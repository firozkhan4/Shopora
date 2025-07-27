import { HttpStatus } from "microutilpkg";


class InvalidPasswordException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HttpStatus.BAD_REQUEST;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default InvalidPasswordException;

