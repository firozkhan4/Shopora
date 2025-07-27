import { HttpStatus } from "microutilpkg";

class UserNotFoundException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = HttpStatus.NOT_FOUND;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default UserNotFoundException;
