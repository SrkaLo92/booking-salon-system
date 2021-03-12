import { Request, Response, NextFunction, RequestHandler } from 'express';
import Logger from '../loaders/logger';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export default (execution: AsyncFunction): RequestHandler => (req: Request, res: Response, next: NextFunction) => {
    execution(req, res, next).catch(e => {
        Logger.error('🔥 error: %o', e);
        next(e);
    });
};
