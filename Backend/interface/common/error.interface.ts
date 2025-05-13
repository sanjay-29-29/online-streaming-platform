export type ValidationErrorDetail = Record<string, string[]>;

export interface ErrorResponse {
  statusCode: number;
  message: string;
  isOperational: boolean;
  success: boolean;
  stack?: string;
  errors?: ValidationErrorDetail[];
}
