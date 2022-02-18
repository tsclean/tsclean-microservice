import faker from '@faker-js/faker';
import {IHashRepository} from "@/domain/models/contracts/hash-repository";
import {IAccountRepository} from "@/domain/models/contracts/account-repository";

export class AccountServiceSpy implements IAccountRepository {
    params: IAccountRepository.Params;
    result = true;

    async account(data: IAccountRepository.Params): Promise<IAccountRepository.Result> {
        this.params = data;
        return this.result;
    }
}

export class HashSpy implements IHashRepository {
    digest = faker.datatype.uuid()
    text: string;

    async hash(text: string): Promise<string> {
        this.text = text;
        return this.digest;
    }

}
