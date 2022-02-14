import {AddUserParams} from "@/domain/models/user";
import {UserModelSchema as Model} from "@/infrastructure/driven-adapters/adapters/orm/mongoose/models/user";
import {IAccountRepository} from "@/domain/models/contracts/account-repository";
import {ICheckEmailRepository} from "@/domain/models/contracts/check-email-repository";

export class UserMongooseRepositoryAdapter implements IAccountRepository, ICheckEmailRepository {

    async account(data: AddUserParams): Promise<IAccountRepository.Result> {
        const account = await Model.create(data);
        return account !== null;
    }

    async checkEmail(email: string): Promise<boolean> {
        const account =  await Model.findOne({email});
        return account !== null;
    }
}
