export const LOAD_ACCOUNT_BY_EMAIL_REPOSITORY = 'LOAD_ACCOUNT_BY_EMAIL_REPOSITORY';

export interface ILoadAccountByEmailRepository {
    loadByEmail: (email: string) => Promise<ILoadAccountByEmailRepository.Result>
}

export namespace ILoadAccountByEmailRepository {
    export type Result = {
        id: string | number;
        name: string;
        password: string;
    }
}