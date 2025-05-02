import { AppError, isAppError, UnkownError } from './error';
import logger from './logger.util';

export const GeneralErrorHandler = (
  error: AppError | unknown,
  errorMsg?: string
) => {
  if (isAppError(error)) {
    return error as AppError;
  }
  logger.error('Error:', error);
  return new UnkownError(
    errorMsg ?? 'Internal Server Error',
    (error as Error).message
  );
};

export const isEmail = (input: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(input);
};

export const isPhoneNumber = (input: string) => {
  const phoneRegex = /^\d{10}$/; // Exactly 10 digits
  return phoneRegex.test(input);
};
