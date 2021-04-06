import argon2 from 'argon2';
import { randomBytes } from 'crypto';

export function hashPassword(password: string): Promise<string> {
    const salt = randomBytes(32);
    return argon2.hash(password, { salt });
}

export function verifyPassword(hash: string, password: string): Promise<boolean> {
    return argon2.verify(hash, password);
}
