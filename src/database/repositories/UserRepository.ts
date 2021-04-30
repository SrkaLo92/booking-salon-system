import { Inject, Service } from 'typedi';
import { PrismaClient } from '.prisma/client';
import { UserInsert, UserUpdate, UserSelect, UserSelectWithPassword } from '../../interfaces/User';

const selectColumns = { id: true, name: true, email: true, createdAt: true, updatedAt: true };

@Service()
export default class UserRepository {
    constructor(@Inject('db') private prisma: PrismaClient) {}

    createUser(user: UserInsert): Promise<void> {
        return this.prisma.user
            .create({
                select: null,
                data: { ...user, deleted: false, active: true },
            })
            .then();
    }

    updateUser(userId: number, user: UserUpdate): Promise<void> {
        return this.prisma.user
            .update({
                select: null,
                where: { id: userId },
                data: user,
            })
            .then();
    }

    findUserByEmail(email: string): Promise<UserSelectWithPassword> {
        return this.prisma.user.findFirst({
            select: { ...selectColumns, passwordHash: true },
            where: { email: email, deleted: false },
        });
    }

    findUserById(id: number): Promise<UserSelect> {
        return this.prisma.user.findFirst({
            select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
            where: { id, deleted: false },
        });
    }

    existsUserByEmail(email: string): Promise<boolean> {
        return this.prisma.user.count({ where: { email } }).then(count => count > 0);
    }

    deleteUser(userId: number): Promise<void> {
        return this.prisma.user
            .update({
                select: null,
                where: { id: userId },
                data: { deleted: true },
            })
            .then();
    }
}
