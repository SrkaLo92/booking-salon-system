import { Router } from 'express';
import auth from './routes/auth';
import facility from './routes/facility';

// guaranteed to get dependencies
export default (): Router => {
    const appRouter = Router();
    auth(appRouter);
    facility(appRouter);
    return appRouter;
};
