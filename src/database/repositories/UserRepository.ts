import { Service } from 'typedi';
import { getRepository } from 'typeorm';
import { User } from '../entities/User';

@Service()
export default class UserRepository {
    private repository = getRepository(User);

    save(user: User): Promise<User> {
        return this.repository.save(user);
    }

    getUserByEmail(email: string): Promise<User> {
        return this.repository.findOne({ where: { email } });
    }
}
