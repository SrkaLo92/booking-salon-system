import { Service } from 'typedi';
import jwt from 'jsonwebtoken';
import { UserRegisterDTO } from '../interfaces/User';
import UserRepository from '../database/repositories/UserRepository';
import { User } from '../database/entities/User';
import config from '../config';
import UnauthorizedError from '../util/errors/UnauthorizedError';
import ValidationError from '../util/errors/ValidationError';
import { JwtToken } from '../interfaces/Express';
import { to } from '../util/awaitTo';
import { hashPassword, verifyPassword } from '../util/security/password';

@Service()
export default class AuthService {
    constructor(private userRepository: UserRepository) {}

    public async SignUp(userDTO: UserRegisterDTO): Promise<void> {
        if (userDTO.password !== userDTO.confirmPassword)
            throw new ValidationError('Password and confirm password are not same!');

        const [existsUserErr, userExists] = await to(this.userRepository.existsUserByEmail(userDTO.email));
        if (existsUserErr) throw existsUserErr;
        if (userExists) throw new ValidationError(`User with email ${userDTO.email} already exists`);

        const [hashErr, hashedPassword] = await to(hashPassword(userDTO.password));
        if (hashErr) throw hashErr;

        const user: User = new User(userDTO.name, userDTO.email, hashedPassword, true);

        const [saveUserErr] = await to(this.userRepository.saveUser(user));
        if (saveUserErr) throw saveUserErr;
    }

    public async SignIn(email: string, password: string): Promise<string> {
        const [findUserErr, user] = await to(this.userRepository.findUserByEmail(email));
        if (findUserErr) throw findUserErr;
        if (!user) throw new UnauthorizedError('Credentials are incorrect.');

        const [verifyErr, validPassword] = await to(verifyPassword(user.passwordHash, password));
        if (verifyErr) throw verifyErr;
        if (!validPassword) throw new UnauthorizedError('Credentials are incorrect.');

        return this.generateToken(user);
    }

    public async getUserInfo(token: JwtToken): Promise<UserLoad> {
        return {
            id: token.id,
            name: token.name,
            email: token.email,
        };
    }

    public async editUser(userID: number, userInfo: UserSave, userImage: Buffer): Promise<void> {
        const [findUserErr, existingUser] = await to(this.userRepository.findUserById(userID));
        if (findUserErr) throw findUserErr;
        if (!existingUser) throw new NotFoundError(`You should not be here, please contact support`);

        if (existingUser.email !== userInfo.email) {
            const [existsUserErr, userExists] = await to(this.userRepository.existsUserByEmail(userInfo.email));
            if (existsUserErr) throw existsUserErr;
            if (userExists) throw new ValidationError(`User with email ${userInfo.email} already exists`);
        }

        existingUser.name = userInfo.name;
        existingUser.email = userInfo.email;
        if (userInfo.password) {
            const [hashErr, hashedPassword] = await to(hashPassword(userInfo.password));
            if (hashErr) throw hashErr;
            existingUser.passwordHash = hashedPassword;
        }
        const [saveUserErr] = await to(this.userRepository.saveUser(existingUser));
        if (saveUserErr) throw saveUserErr;

        return this.generateToken(existingUser);
    }

    private generateToken(user: User) {
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + config.jwt.expirationDays);

        const jwtData: JwtToken = {
            id: user.id, // We are gonna use this in the middleware 'isAuth'
            name: user.name,
            email: user.email,
            exp: exp.getTime() / 1000,
            iss: config.domain,
        };
        return jwt.sign(jwtData, config.jwt.secret);
    }

    public async deleteUser(userId: number): Promise<void> {
        const [findUserErr, existingUser] = await to(this.userRepository.findUserById(userId));
        if (findUserErr) throw findUserErr;
        if (!existingUser) throw new NotFoundError(`There is no user with id ${userId}`);

        const [deleteUserErr] = await to(this.userRepository.deleteUser(existingUser));
        if (deleteUserErr) throw deleteUserErr;
    }
}
