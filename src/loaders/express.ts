import express, { Application as ExpressApplication } from 'express';
import cors from 'cors';
import routes from '../api';
import config from '../config';
import { errors } from 'celebrate';
import { authErrorHandler, errorHandler, notFoundHandler } from '../api/middlewares/errorHandlers';

export default (app: ExpressApplication): void => {
    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.enable('trust proxy');

    // The magic package that prevents frontend developers going nuts
    // Alternate description:
    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors());

    // Middleware that transforms the raw string of req.body into json
    app.use(express.json());

    // Load API routes
    app.use(config.api.prefix, routes());

    /// error handlers
    app.use(errors()); // error handler for celebrity errors
    app.use(notFoundHandler);
    app.use(authErrorHandler);
    app.use(errorHandler);
};
