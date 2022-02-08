import faker from 'faker2';
import {IAccountService} from "@/domain/use-cases/account-service";
import {AddUserParams} from "@/domain/models/user";

export class AccountServiceSpy implements IAccountService {
    params: AddUserParams;
    result = true;

    async account(data: AddUserParams): Promise<boolean> {
        this.params = data;
        return this.result;
    }
}
