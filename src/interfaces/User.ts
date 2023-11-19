import { User, UserRole } from '.prisma/client';

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type UserInsert = Pick<User, 'name' | 'email' | 'passwordHash' | 'role' | 'phoneNumber'>;
export type UserUpdate = PartialBy<UserInsert, 'passwordHash'>;
export type UserSelect = Pick<User, 'id' | 'name' | 'email' | 'createdAt' | 'updatedAt' | 'role' | 'phoneNumber'>;
export type UserSelectWithPassword = UserSelect & Pick<User, 'passwordHash'>;

export interface UserRegisterDTO {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: UserRole;
    phoneNumber: string;
}

export interface UserLoginDTO {
    email: string;
    password: string;
}

export interface UserSave {
    name: string;
    email: string;
    password?: string;
    role: UserRole;
    phoneNumber: string;
}

export interface UserLoad {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    phoneNumber: string;
}
