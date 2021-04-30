import { Application as ExpressApplication } from 'express';
import expressLoader from './express';
import { prisma } from './prisma';
import Container from 'typedi';
import Logger from './logger';

//We have to import at least all the events once so they can be triggered
import '../subscribers';
Logger.info('✌️ Events loaded');

export default async (expressApp: ExpressApplication): Promise<void> => {
    Container.set('db', prisma);
    Logger.info('✌️ Database loaded');

    expressLoader(expressApp);
    Logger.info('✌️ Express loaded');
};
