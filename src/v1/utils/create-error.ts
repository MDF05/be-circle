export class CustomError extends Error {
    status: number
    succes: boolean

    constructor(status: number, message?: string,) {
        super(message);
        this.status = status;
        this.succes = false
    }
}


export default function createError(status: number, message?: string,): CustomError {
    return new CustomError(status, message);
}