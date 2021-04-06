import { Request, Response, NextFunction, RequestHandler } from 'express';
import Logger from '../loaders/logger';

type AsyncFunction = (req: Request) => Promise<unknown>;
type AsyncHandlerOptions = { status?: number; converter?: (result: unknown) => unknown };

export default (execution: AsyncFunction, options?: AsyncHandlerOptions): RequestHandler => (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    execution(req)
        .then(result => {
            res.status(options?.status || 200).json(options?.converter ? options.converter(result) : result);
        })
        .catch(e => {
            Logger.error('🔥 error: %o', e);
            next(e);
        });
};
