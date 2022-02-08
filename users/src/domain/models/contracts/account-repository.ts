import {AddUserParams, UserModel} from "@/domain/models/user";

export const ACCOUNT_REPOSITORY = 'ACCOUNT_REPOSITORY';

export interface IAccountRepository {
    account: (data: AddUserParams) => Promise<UserModel>
}
