import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import HttpException from '../exceptions/HttpException';
 
function errorMiddleware(error: HttpException, request: Request, response: Response, next: NextFunction) {
  // this is just workaround to handle correct statuses because we do not get them from axios failed request
  const isNotFound = error.message.includes('ENOTFOUND');
  const isUnauthorized = error.message.includes('401');

  const status = isNotFound ? StatusCodes.NOT_FOUND : isUnauthorized ? StatusCodes.UNAUTHORIZED : error.status || 500;
  const message = error.message || 'Something went wrong';
  
  response
    .status(status)
    .send({
      status,
      message,
    })
}
 
export default errorMiddleware;