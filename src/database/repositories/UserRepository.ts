import { Inject, Service } from 'typedi';
import { MikroORM, EntityRepository } from '@mikro-orm/core';
import { User } from '../entities/User';

@Service()
export default class UserRepository {
    private ormRepository: EntityRepository<User>;

    constructor(@Inject('orm') orm: MikroORM) {
        this.ormRepository = orm.em.getRepository(User);
    }

    async saveUser(user: User): Promise<User> {
        await this.ormRepository.persistAndFlush(user);
        return { ...user };
    }

    getUserByEmail(email: string): Promise<User> {
        return this.ormRepository.findOne({ email });
    }

    getUserById(id: number): Promise<User> {
        return this.ormRepository.findOne({ id });
    }
}
