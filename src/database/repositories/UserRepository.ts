import { Inject, Service } from 'typedi';
import { MikroORM, EntityRepository } from '@mikro-orm/core';
import { User } from '../entities/User';

@Service()
export default class UserRepository {
    private ormRepository: EntityRepository<User>;

    constructor(@Inject('orm') orm: MikroORM) {
        this.ormRepository = orm.em.getRepository(User);
    }

    saveUser(user: User): Promise<void> {
        user.isDeleted = false;
        return this.ormRepository.persistAndFlush(user);
    }

    findUserByEmail(email: string): Promise<User> {
        return this.ormRepository.findOne({ email, isDeleted: false });
    }

    findUserById(id: number): Promise<User> {
        return this.ormRepository.findOne({ id, isDeleted: false });
    }

    existsUserByEmail(email: string): Promise<boolean> {
        return this.ormRepository.findOne({ email, isDeleted: false }, { fields: ['id'] }).then(user => user != null);
    }

    deleteUser(user: User): Promise<void> {
        user.isDeleted = true;
        return this.ormRepository.persistAndFlush(user);
    }
}
