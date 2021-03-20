import { Application as ExpressApplication } from 'express';
import expressLoader from './express';
import mirkoormLoader from './mikroorm';

import Logger from './logger';

//We have to import at least all the events once so they can be triggered
import '../subscribers';
import Container from 'typedi';
Logger.info('✌️ Events loaded');

export default async (expressApp: ExpressApplication): Promise<void> => {
    const mikroorm = await mirkoormLoader();
    Container.set('orm', mikroorm);
    Logger.info('✌️ Database loaded');

    expressLoader(expressApp);
    Logger.info('✌️ Express loaded');
};
