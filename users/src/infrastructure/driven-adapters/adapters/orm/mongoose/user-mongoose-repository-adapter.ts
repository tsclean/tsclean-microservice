import {AddUserParams} from "@/domain/models/user";
import {UserModelSchema} from "@/infrastructure/driven-adapters/adapters/orm/mongoose/models/user";
import {IAccountRepository} from "@/domain/models/contracts/account-repository";

export class UserMongooseRepositoryAdapter implements IAccountRepository {

    async account(data: AddUserParams): Promise<IAccountRepository.Result> {
        const account = await UserModelSchema.create(data);
        return account !== null;
    }
}
