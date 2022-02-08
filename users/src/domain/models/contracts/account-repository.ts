import {AddUserParams} from "@/domain/models/user";

export const ACCOUNT_REPOSITORY = 'ACCOUNT_REPOSITORY';

export interface IAccountRepository {
    account: (data: AddUserParams) => Promise<IAccountRepository.Result>
}

export namespace IAccountRepository {
    export type Result = boolean;
}
