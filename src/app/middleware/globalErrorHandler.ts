import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { TErrorSources } from "../interface/error.interface";
import config from "../config";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";
import handleCastError from "../errors/handleCastError";

export const globalErrorHandler: ErrorRequestHandler = (
    err,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    if (err) {
      let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
      let message = err.message || 'Something went wrong';
  
      let errorSources: TErrorSources = [
        {
          path: '',
          message: 'Something went wrong',
        },
      ];
  
      if (err instanceof ZodError) {
        errorSources = handleZodError(err);
        message = 'Validation Error';
        statusCode = StatusCodes.BAD_REQUEST;
      }
  
      if (err?.name === 'ValidationError') {
        errorSources = handleValidationError(err);
        message = 'Validation Error';
        statusCode = StatusCodes.BAD_REQUEST;
      }
  
      if (err?.name === 'CastError') {
        errorSources = handleCastError(err);
        message = 'Invalid Id';
        statusCode = StatusCodes.BAD_REQUEST;
      }
  
      console.log(err)
  
      res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config.node_env === 'Development' ? err.stack : null,
      });
    } else {
      next();
    }
  };
  