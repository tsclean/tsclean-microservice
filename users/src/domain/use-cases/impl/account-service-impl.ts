import {Adapter, Service} from "@tsclean/core";
import {IAccountService} from "@/domain/use-cases/account-service";
import {AddUserParams} from "@/domain/models/user";
import {ACCOUNT_REPOSITORY, IAccountRepository} from "@/domain/models/contracts/account-repository";

@Service()
export class AccountServiceImpl implements IAccountService {

    constructor(
        @Adapter(ACCOUNT_REPOSITORY)
        private readonly accountRepository: IAccountRepository
    ) {
    }

    async account(data: AddUserParams): Promise<boolean> {
        return await this.accountRepository.account(data);
    }
}
