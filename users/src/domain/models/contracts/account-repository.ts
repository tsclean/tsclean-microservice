export const ACCOUNT_REPOSITORY = 'ACCOUNT_REPOSITORY';

export interface IAccountRepository {
    account: (data: IAccountRepository.Params) => Promise<IAccountRepository.Result>
}

export namespace IAccountRepository {
    export type Params = {
        name: string;
        email: string;
        password: string;
    }

    export type Result = boolean;
}
