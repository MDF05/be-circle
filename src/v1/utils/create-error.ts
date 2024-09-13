export class CustomError extends Error {
    status: number
    succes: boolean

    constructor(message: string, status: number) {
        super(message);
        this.status = status;
        this.succes = false
    }
}


export default function createError(message: string, status: number): CustomError {
    return new CustomError(message, status);
}