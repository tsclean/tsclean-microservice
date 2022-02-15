import {Adapter, Service} from "@tsclean/core";
import {IAccountService} from "@/domain/use-cases/account-service";
import {AddUserParams} from "@/domain/models/user";
import {ACCOUNT_REPOSITORY, IAccountRepository} from "@/domain/models/contracts/account-repository";
import {HASH_REPOSITORY, IHashRepository} from "@/domain/models/contracts/hash-repository";

@Service()
export class AccountServiceImpl implements IAccountService {

    constructor(
        @Adapter(ACCOUNT_REPOSITORY)
        private readonly accountRepository: IAccountRepository,
        @Adapter(HASH_REPOSITORY)
        private readonly hashRepository: IHashRepository
    ) {
    }

    async account(data: AddUserParams): Promise<boolean> {
        const hashPassword = await this.hashRepository.hash(data.password);
        return await this.accountRepository.account({...data, password: hashPassword});
    }
}
