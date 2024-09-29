import { Request } from 'express';
import UserExtProfile from './user-ext-profile';

export default interface RequestExtUser extends Request {
    user?: UserExtProfile,
    files?: any
}


