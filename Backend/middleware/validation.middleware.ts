// middlewares/validation.middleware.ts

import { Request, Response, NextFunction } from 'express';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { ValidationErrorDetail } from '../interface/common/error.interface';
import { formatValidationErrors } from '../utils/errorValidation.utils';
import { InternalValidationError } from '../utils/error';

export type DTOClass<T> = new () => T;

export const validateDTO =
  <T>(dtoClass: DTOClass<T>) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      // Convert the plain object to an instance of the DTO class
      const dto = plainToClass(dtoClass, req.body);
      // Validate the DTO
      const errors: ValidationError[] = await validate(dto as object);

      if (errors.length > 0) {
        // Format validation errors using the custom function
        const formattedErrors: ValidationErrorDetail[] =
          formatValidationErrors(errors);

        // Return a 400 Bad Request response with the validation errors
        return next(new InternalValidationError(formattedErrors));
      }
      // Attach the validated DTO to the request body
      req.body = dto;

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      // Handle unexpected errors
      next(error as Error);
    }
  };

export const validateQueryParams =
  <T>(dtoClass: DTOClass<T>) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      // Convert the plain object to an instance of the DTO class
      const dto = plainToClass(dtoClass, req.query);
      // Validate the DTO
      const errors: ValidationError[] = await validate(dto as object);

      if (errors.length > 0) {
        // Format validation errors using the custom function
        const formattedErrors: ValidationErrorDetail[] =
          formatValidationErrors(errors);

        // Return a 400 Bad Request response with the validation errors
        return next(new InternalValidationError(formattedErrors));
      }
      // Attach the validated DTO to the request body

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      // Handle unexpected errors
      next(error as Error);
    }
  };

export const validateHeaders = <T>(dtoClass: DTOClass<T>) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      // Convert the plain object to an instance of the DTO class
      const dto = plainToClass(dtoClass, req.headers);
      // Validate the DTO
      const errors: ValidationError[] = await validate(dto as object);

      if (errors.length > 0) {
        // Format validation errors using the custom function
        const formattedErrors: ValidationErrorDetail[] =
          formatValidationErrors(errors);

        // Return a 400 Bad Request response with the validation errors
        return next(new InternalValidationError(formattedErrors));
      }
      // Attach the validated DTO to the request body

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      // Handle unexpected errors
      next(error as Error);
    }
  };
};
