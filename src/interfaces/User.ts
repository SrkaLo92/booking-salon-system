import { User } from '.prisma/client';
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type UserInsert = Pick<User, 'name' | 'email' | 'passwordHash'>;
export type UserUpdate = PartialBy<UserInsert, 'passwordHash'>;
export type UserSelect = Pick<User, 'id' | 'name' | 'email' | 'createdAt' | 'updatedAt'>;
export type UserSelectWithPassword = UserSelect & Pick<User, 'passwordHash'>;

export interface UserRegisterDTO {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface UserLoginDTO {
    email: string;
    password: string;
}

export interface UserSave {
    name: string;
    email: string;
    password?: string;
}

export interface UserLoad {
    id: number;
    name: string;
    email: string;
}
