import { ErrorResponse, ValidationErrorDetail } from "../interface/common/error.interface";

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;
  message: string;
  errors?: ValidationErrorDetail[];
  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.message = message;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }

  format() {
    const errorResponse: ErrorResponse = {
      statusCode: this.statusCode,
      message: this.message,
      isOperational: this.isOperational,
      success: false
    };

    if (this.errors && this.errors.length > 0) {
      errorResponse.errors = this.errors;
    }

    if (process.env.NODE_ENV === 'development') {
      errorResponse.stack = this.stack;
    }

    return errorResponse;
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(404, message);
    this.name = 'NotFoundError';
  }
}

export class InternalValidationError extends AppError {
  errors: ValidationErrorDetail[];
  constructor(
    errorsOrMessage: ValidationErrorDetail[] | string = 'Validation failed'
  ) {
    if (Array.isArray(errorsOrMessage)) {
      super(400, 'Validation failed');
      this.errors = errorsOrMessage;
    } else {
      super(400, errorsOrMessage);
    }
    this.name = 'InternalValidationError';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(401, message);
    this.name = 'UnauthorizedError';
  }
}

export class FirebaseTokenExpired extends AppError {
  constructor(message = 'Token expired') {
    super(401, message);
    this.name = 'FirebaseTokenExpired';
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(403, message);
    this.name = 'ForbiddenError';
  }
}

export class UserNotFoundError extends AppError {
  constructor(message = 'User not found') {
    super(404, message);
    this.name = 'UserNotFoundError';
  }
}

export class UnkownError extends AppError {
  errorStack: string;
  constructor(message = 'Unknown error', errorStack = '') {
    super(500, message);
    this.errorStack = errorStack;
    this.name = 'InternalError';
  }
}

export function isAppError(error: unknown): boolean {
  return (
    error instanceof AppError ||
    error instanceof NotFoundError ||
    error instanceof InternalValidationError ||
    error instanceof UnauthorizedError ||
    error instanceof ForbiddenError ||
    error instanceof UserNotFoundError ||
    error instanceof UnkownError ||
    error instanceof FirebaseTokenExpired
  );
}
