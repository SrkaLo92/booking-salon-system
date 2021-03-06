import { Service } from 'typedi';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import { UserRegisterDTO } from '../interfaces/User';
import UserRepository from '../database/repositories/UserRepository';
import { User } from '../database/entities/User';

@Service()
export default class AuthService {
    constructor(private userRepository: UserRepository) {}

    public async SignUp(userDTO: UserRegisterDTO): Promise<User> {
        if (userDTO.password !== userDTO.confirm_password) {
            throw new Error('Password and confirm password are not same!'); // change this with custom errors
        }

        const salt = randomBytes(32);
        const passwordHash = await argon2.hash(userDTO.password, { salt });

        const user: User = new User(userDTO.name, userDTO.email, passwordHash, true);

        const createdUser = await this.userRepository.save(user);
        delete createdUser.passwordHash;

        return createdUser;
    }

    public async SignIn(): Promise<unknown> {
        return {};
    }
}
