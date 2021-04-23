import { Inject, Service } from 'typedi';
import { MikroORM, EntityRepository } from '@mikro-orm/core';
import { UserImage } from '../entities/UserImage';

@Service()
export default class UserImageRepository {
    private ormRepository: EntityRepository<UserImage>;

    constructor(@Inject('orm') orm: MikroORM) {
        this.ormRepository = orm.em.getRepository(UserImage);
    }

    saveImage(userImage: UserImage): Promise<void> {
        return this.ormRepository.persistAndFlush(userImage);
    }

    findUserImageByUserId(userId: number): Promise<UserImage> {
        return this.ormRepository.findOne({
            user: {
                id: userId,
            },
        });
    }
}
