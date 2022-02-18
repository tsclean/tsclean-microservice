export class AccessDeniedError extends Error {
    constructor() {
        super('Internal Server Error');
        this.name = 'AccessDeniedError';
    }
}

export class EmailInUseError extends Error {
    constructor() {
        super('The received email is already in use');
        this.name = 'EmailInUseError';
    }
}

export class InvalidParamError extends Error {
    constructor(param: string) {
        super(`Invalid param: ${param}`);
        this.name = 'InvalidParamError';
    }
}

export class MissingParamError extends Error {
    constructor(param: string) {
        super(`Missing param: ${param}`);
        this.name = 'MissingParamError';
    }
}

export class ServerError extends Error {
    constructor(stack: string) {
        super('Internal Server Error');
        this.name = 'ServerError';
        this.stack = stack;
    }
}

export class UnauthorizedError extends Error {
    constructor () {
        super('Unauthorized')
        this.name = 'Unauthorized for resource'
    }
}

export const throwError = (): never => {
    throw new Error()
}
