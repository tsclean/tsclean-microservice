import {Adapter, Service} from "@tsclean/core";
import {IAuthService} from "@/domain/use-cases/auth-service";
import {ENCRYPT_REPOSITORY, IEncryptRepository} from "@/domain/models/contracts/encrypt-repository";
import {HASH_COMPARE_REPOSITORY, IHashCompareRepository} from "@/domain/models/contracts/hash-compare-repository";
import {
    ILoadAccountByEmailRepository,
    LOAD_ACCOUNT_BY_EMAIL_REPOSITORY
} from "@/domain/models/contracts/load-account-by-email-repository";
import {
    IUpdateAccessTokenRepository,
    UPDATE_TOKEN_REPOSITORY
} from "@/domain/models/contracts/update-access-token-repository";

@Service()
export class AuthServiceImpl implements IAuthService {
    constructor(
        @Adapter(HASH_COMPARE_REPOSITORY)
        private readonly hashCompare: IHashCompareRepository,
        @Adapter(ENCRYPT_REPOSITORY)
        private readonly encryptRepository: IEncryptRepository,
        @Adapter(UPDATE_TOKEN_REPOSITORY)
        private readonly updateTokenRepository: IUpdateAccessTokenRepository,
        @Adapter(LOAD_ACCOUNT_BY_EMAIL_REPOSITORY)
        private readonly loadAccountEmailRepository: ILoadAccountByEmailRepository
    ) {
    }

    async auth(data: IAuthService.Params): Promise<IAuthService.Result> {
        const account = await this.loadAccountEmailRepository.loadByEmail(data.email);
        if (account) {
            const valid = await this.hashCompare.compare(data.password, account.password);
            if (valid) {
                const accessToken = await this.encryptRepository.encrypt(account.id);
                await this.updateTokenRepository.updateToken(account.id, accessToken);
                return {
                    accessToken,
                    name: account.name
                }
            }
        }
        return null;
    }
}