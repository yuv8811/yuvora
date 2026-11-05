import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../../shared/types/api';

export class AppError extends Error {
  statusCode: number;
  code: string;

  constructor(message: string, statusCode = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export function errorHandler(
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const statusCode = (err as AppError).statusCode || 500;
  const code = (err as AppError).code || 'INTERNAL_ERROR';

  const response: ApiResponse<null> = {
    success: false,
    data: null,
    error: {
      code,
      message: err.message || 'An unexpected error occurred.',
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    },
  };

  res.status(statusCode).json(response);
}

