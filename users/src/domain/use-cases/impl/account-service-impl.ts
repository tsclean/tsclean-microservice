import {Adapter, Service} from "@tsclean/core";
import {IAccountService} from "@/domain/use-cases/account-service";
import {AddUserParams} from "@/domain/models/user";
import {ACCOUNT_REPOSITORY, IAccountRepository} from "@/domain/models/contracts/account-repository";
import {HASH_REPOSITORY, IHashRepository} from "@/domain/models/contracts/hash-repository";
import {CHECK_EMAIL_REPOSITORY, ICheckEmailRepository} from "@/domain/models/contracts/check-email-repository";
import {VALIDATIONS_REPOSITORY} from "@/domain/models/contracts/validations-repository";

@Service()
export class AccountServiceImpl implements IAccountService {

    constructor(
        @Adapter(ACCOUNT_REPOSITORY)
        private readonly accountRepository: IAccountRepository,
        @Adapter(HASH_REPOSITORY)
        private readonly hashRepository: IHashRepository,
        @Adapter(CHECK_EMAIL_REPOSITORY)
        private readonly checkEmailRepository: ICheckEmailRepository,
    ) {
    }

    async account(data: AddUserParams): Promise<boolean> {
        const accountExist = await this.checkEmailRepository.checkEmail(data.email);
        let valid: boolean = false;
        if (!accountExist) {
            const hashPassword = await this.hashRepository.hash(data.password);
            valid =  await this.accountRepository.account({...data, password: hashPassword});
        }
        return valid;
    }
}
