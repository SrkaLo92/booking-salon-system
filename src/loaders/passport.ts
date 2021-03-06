import passport from 'passport';
import argon2 from 'argon2';
import { Strategy as LocalStrategy } from 'passport-local';
import UserRepository from '../database/repositories/UserRepository';
import { Container } from 'typedi';

async function verifyCredentials(email, password, done) {
    const userRepository: UserRepository = Container.get(UserRepository);
    const user = await userRepository.getUserByEmail(email);

    if (!user) {
        return done(null, false, { message: 'Credentials are incorrect.' });
    }

    const validPassword = await argon2.verify(user.passwordHash, password);
    if (!validPassword) {
        return done(null, false, { message: 'Credentials are incorrect.' });
    }

    return done(null, user);
}

const strategy = new LocalStrategy({ usernameField: 'email' }, verifyCredentials);

passport.use(strategy);

export default passport;
