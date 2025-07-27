import { HttpStatus } from "microutilpkg";


class UserAlreadyExistsException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HttpStatus.CONFLICT;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default UserAlreadyExistsException;
