import { NextFunction, Request, Response } from 'express';
import { User, UserRole } from '@prisma/client';
import RequestExtUser from './types/request-extends-user';
import createError from '../utils/create-error';

export default function Authorization(role: UserRole) {
    return (req: RequestExtUser, res: Response, next: NextFunction) => {
        const user = req.user as User

        if (user && user.role !== role) {
            return next(createError("forbidden user", 403))
        }

        next()

    }
}
