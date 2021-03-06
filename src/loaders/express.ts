import express, { Application as ExpressApplication } from 'express';
import cors from 'cors';
import routes from '../api';
import config from '../config';
import { errors } from 'celebrate';
import { PassportStatic } from 'passport';

export default (app: ExpressApplication, passport: PassportStatic): void => {
    // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
    // It shows the real origin IP in the heroku or Cloudwatch logs
    app.enable('trust proxy');

    // The magic package that prevents frontend developers going nuts
    // Alternate description:
    // Enable Cross Origin Resource Sharing to all origins by default
    app.use(cors());

    // Middleware that transforms the raw string of req.body into json
    app.use(express.json());

    // Middleware for setup of passport
    app.use(passport.initialize());
    app.use(passport.session()); // @TODO do we need this?

    // Load API routes
    app.use(config.api.prefix, routes());

    app.use(errors());
    /// catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err['status'] = 404;
        next(err);
    });
};
