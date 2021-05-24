import { Service } from 'typedi';
import jwt from 'jsonwebtoken';
import { UserInsert, UserLoad, UserRegisterDTO, UserSave, UserSelect, UserUpdate } from '../interfaces/User';
import UserRepository from '../database/repositories/UserRepository';
import config from '../config';
import UnauthorizedError from '../util/errors/UnauthorizedError';
import ValidationError from '../util/errors/ValidationError';
import { JwtToken } from '../interfaces/Express';
import { to } from '../util/awaitTo';
import { hashPassword, verifyPassword } from '../util/security/password';
import NotFoundError from '../util/errors/NotFoundError';

@Service()
export default class AuthService {
    constructor(private userRepository: UserRepository) {}

    public async SignUp(userDTO: UserRegisterDTO): Promise<void> {
        const { password, confirmPassword, ...userInfo } = userDTO;
        if (password !== confirmPassword) throw new ValidationError('Password and confirm password are not same!');

        const [existsUserErr] = await to(this.checkIsEmailUnique(userInfo.email));
        if (existsUserErr) throw existsUserErr;

        const [hashErr, hashedPassword] = await to(hashPassword(password));
        if (hashErr) throw hashErr;

        const user: UserInsert = { ...userInfo, passwordHash: hashedPassword };

        const [createUserErr] = await to(this.userRepository.createUser(user));
        if (createUserErr) throw createUserErr;
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

    public async editUser(userId: number, userSave: UserSave): Promise<void> {
        const { password, ...userInfo } = userSave;

        const [findUserErr, existingUser] = await to(this.userRepository.findUserById(userId));
        if (findUserErr) throw findUserErr;
        if (!existingUser) throw new NotFoundError(`You should not be here, please contact support`);

        if (existingUser.email !== userInfo.email) {
            const [existsUserErr] = await to(this.checkIsEmailUnique(userInfo.email));
            if (existsUserErr) throw existsUserErr;
        }

        const user: UserUpdate = { ...userInfo };

        if (password) {
            const [hashErr, hashedPassword] = await to(hashPassword(password));
            if (hashErr) throw hashErr;
            user.passwordHash = hashedPassword;
        }

        const [updateUserErr] = await to(this.userRepository.updateUser(userId, user));
        if (updateUserErr) throw saveUserErr;

        return this.generateToken(existingUser);
    }

    private checkIsEmailUnique(email: string): Promise<void> {
        return this.userRepository.existsUserByEmail(email).then(userExists => {
            if (userExists) throw new ValidationError(`User with email ${email} already exists`);
        });
    }

    private generateToken(user: UserSelect) {
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

        const [deleteUserErr] = await to(this.userRepository.deleteUser(existingUser.id));
        if (deleteUserErr) throw deleteUserErr;
    }
}
