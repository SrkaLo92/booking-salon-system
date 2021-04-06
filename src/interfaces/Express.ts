import { Express, Request } from 'express';

export interface JwtToken extends Express.User {
    id: number;
    name: string;
    email: string;
    exp: number;
    iss: string;
}

export interface RequestWithUser extends Request {
    user?: JwtToken;
}
