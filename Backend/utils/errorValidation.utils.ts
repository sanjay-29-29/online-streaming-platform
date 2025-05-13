import { ValidationError } from 'class-validator';
import { ValidationErrorDetail } from '../interface/common/error.interface';

// Define a type for detailed validation errors

// Function to convert a ValidationError to ValidationErrorDetail
export const formatValidationErrors = (
  errors: ValidationError[]
): ValidationErrorDetail[] => {
  return errors.map((err) => ({
    [err.property]: err.constraints ? Object.values(err.constraints) : []
    // constraints: err.constraints || {}
  }));
};
