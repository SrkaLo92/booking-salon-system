import { Application as ExpressApplication } from 'express';
import expressLoader from './express';
import typeormLoader from './typeorm';

import passport from './passport';
import Logger from './logger';

//We have to import at least all the events once so they can be triggered
import '../subscribers';
Logger.info('✌️ Events loaded');

export default async (expressApp: ExpressApplication): Promise<void> => {
    await typeormLoader();
    Logger.info('✌️ Database loaded');

    expressLoader(expressApp, passport);
    Logger.info('✌️ Express loaded');
};
