import { Service } from 'typedi';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import { UserRegisterDTO } from '../interfaces/User';
import UserRepository from '../database/repositories/UserRepository';
import { User } from '../database/entities/User';
import config from '../config';
import UnauthorizedError from '../util/errors/UnauthorizedError';
import ValidationError from '../util/errors/ValidationError';
import { JwtToken } from '../interfaces/Express';

@Service()
export default class AuthService {
    constructor(private userRepository: UserRepository) {}

    public async SignUp(userDTO: UserRegisterDTO): Promise<User> {
        if (userDTO.password !== userDTO.confirmPassword) {
            throw new ValidationError('Password and confirm password are not same!'); // change this with custom errors
        }

        const salt = randomBytes(32);
        const passwordHash = await argon2.hash(userDTO.password, { salt });

        const user: User = new User(userDTO.name, userDTO.email, passwordHash, true);

        const createdUser = await this.userRepository.save(user);
        delete createdUser.passwordHash;

        return createdUser;
    }

    public async SignIn(email: string, password: string): Promise<string> {
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) {
            throw new UnauthorizedError('Credentials are incorrect.');
        }

        const validPassword = await argon2.verify(user.passwordHash, password);
        if (!validPassword) {
            throw new UnauthorizedError('Credentials are incorrect.');
        }

        return this.generateToken(user);
    }

    private generateToken(user: User) {
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + config.jwt.expirationDays);

        const jwtData: JwtToken = {
            id: user.id, // We are gonna use this in the middleware 'isAuth'
            name: user.name,
            exp: exp.getTime() / 1000,
            iss: config.domain,
        };
        return jwt.sign(jwtData, config.jwt.secret);
    }
}
