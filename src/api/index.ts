import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';
import salon from "./routes/salon";
import category from "./routes/category";
import service from "./routes/service";

// guaranteed to get dependencies
export default (): Router => {
    const appRouter = Router();
    auth(appRouter);
    user(appRouter);
    salon(appRouter);
    category(appRouter);
    service(appRouter);

    return appRouter;
};
