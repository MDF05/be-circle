import jwebtoken from 'jsonwebtoken';
import { Request } from 'express';
import { User } from '@prisma/client';

export default interface RequestExtUser extends Request {
    user?: string | User;
}
