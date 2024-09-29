import { Request } from 'express';

export default interface RequestExtUser extends Request {
    user?: string;
}


