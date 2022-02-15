import {AddUserParams} from "@/domain/models/user";
import {UserModelSchema as Model} from "@/infrastructure/driven-adapters/adapters/orm/mongoose/models/user";
import {IAccountRepository} from "@/domain/models/contracts/account-repository";
import {ICheckEmailRepository} from "@/domain/models/contracts/check-email-repository";
import {ILoadAccountByEmailRepository} from "@/domain/models/contracts/load-account-by-email-repository";
import {IUpdateAccessTokenRepository} from "@/domain/models/contracts/update-access-token-repository";

export class UserMongooseRepositoryAdapter implements IAccountRepository,
    ICheckEmailRepository,
    ILoadAccountByEmailRepository,
    IUpdateAccessTokenRepository {

    async account(data: AddUserParams): Promise<IAccountRepository.Result> {
        const account = await Model.create(data);
        return account !== null;
    }

    async checkEmail(email: string): Promise<boolean> {
        const account = await Model.findOne({email});
        return account !== null;
    }

    async loadByEmail(email: string): Promise<ILoadAccountByEmailRepository.Result> {
        const account = await Model.findOne({email});
        return account && account['_doc'];
    }

    async updateToken(id: string | number, token: string): Promise<void> {
        await Model.updateOne({
            _id: id
        }, {
            $set: {
                accessToken: token
            }
        })
    }

    map(data: any): any {
        const {_id, ...rest} = data
        return {...rest, id: _id.toString()}
    }
}
