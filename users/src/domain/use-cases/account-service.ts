import {AddUserParams, UserModel} from "@/domain/models/user";

export const ACCOUNT_SERVICE = 'ACCOUNT_SERVICE';

export interface IAccountService {
    account: (data: AddUserParams) => Promise<UserModel>
}
