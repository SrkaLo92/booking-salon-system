import { Router } from 'express';
import middlewares from './middlewares';
import auth from './routes/auth';

// guaranteed to get dependencies
export default (): Router => {
    const appRouter = Router();
    auth(appRouter);

    return appRouter;
};
