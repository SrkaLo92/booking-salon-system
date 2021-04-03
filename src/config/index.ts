import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
    // This error should crash whole process

    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    /**
     * Your favorite port
     */
    port: Number(process.env.PORT),

    /**
     * Database config
     */
    database: {
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        name: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        type: process.env.DATABASE_DIALECT,
        debug: Boolean(process.env.DATABASE_DEBUG),
    },

    /**
     * Your secret sauce
     */
    jwt: {
        secret: process.env.JWT_SECRET,
        algorithm: process.env.JWT_ALGO,
        expirationDays: Number(process.env.JWT_EXP_DAYS),
    },
    /**
     * Used by winston logger
     */
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },

    /**
     * API configs
     */
    api: {
        prefix: '/api',
    },

    domain: process.env.DOMAIN,
};
