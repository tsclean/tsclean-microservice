export const AUTH_SERVICE = 'AUTH_SERVICE';

export interface IAuthService {
    auth:(data: IAuthService.Params) => Promise<IAuthService.Result>
}

export namespace IAuthService {
    export type Params = {
        email: string;
        password: string;
    }

    export type Result = {
        accessToken: string;
        name: string;
    }
}