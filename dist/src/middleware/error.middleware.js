"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
function errorMiddleware(error, request, response, next) {
    // this is just workaround to handle correct statuses because we do not get them from axios failed request
    const isNotFound = error.message.includes('ENOTFOUND');
    const isUnauthorized = error.message.includes('401');
    const status = isNotFound ? http_status_codes_1.StatusCodes.NOT_FOUND : isUnauthorized ? http_status_codes_1.StatusCodes.UNAUTHORIZED : error.status || 500;
    const message = error.message || 'Something went wrong';
    response
        .status(status)
        .send({
        status,
        message,
    });
}
exports.default = errorMiddleware;
