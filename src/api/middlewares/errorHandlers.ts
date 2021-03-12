import { NextFunction, Request, Response } from 'express';

/**
 *  Catch 404 and forward to error handler
 */
export const notFoundHandler = (req: Request, res: Response, next: NextFunction): void => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
};

/**
 * Handle 401 thrown by express-jwt library
 */
export const authErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    if (err.name === 'UnauthorizedError') {
        res.status(err['status']).send({ message: err.message }).end();
    } else {
        next(err);
    }
};

/**
 * Handle all errors
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
    res.status(err['status'] || 500);
    res.json({
        errors: {
            message: err.message,
        },
    });
};
