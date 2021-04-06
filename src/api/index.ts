import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import facility from './routes/facility';
import inmate from './routes/inmate';

// guaranteed to get dependencies
export default (): Router => {
    const appRouter = Router();
    auth(appRouter);
    user(appRouter);
    facility(appRouter);
    inmate(appRouter);

    return appRouter;
};
