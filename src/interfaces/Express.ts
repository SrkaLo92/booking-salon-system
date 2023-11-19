import { Express, Request } from 'express';
import { UserRole } from "@prisma/client";

export interface JwtToken extends Express.User {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    phoneNumber: string;
    exp: number;
    iss: string;
}

export interface RequestWithUser extends Request {
    user?: JwtToken;
}
