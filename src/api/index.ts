import { Router } from 'express';
import auth from './routes/auth';
import facility from './routes/facility';
import inmate from './routes/inmate';

// guaranteed to get dependencies
export default (): Router => {
    const appRouter = Router();
    auth(appRouter);
    facility(appRouter);
    inmate(appRouter);
    
    return appRouter;
};
