import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import salon from "./routes/salon";

// guaranteed to get dependencies
export default (): Router => {
    const appRouter = Router();
    auth(appRouter);
    user(appRouter);
    salon(appRouter);

    return appRouter;
};
