import {ACCOUNT_REPOSITORY} from "@/domain/models/contracts/account-repository";
import {UserMongooseRepositoryAdapter} from "@/infrastructure/driven-adapters/adapters/orm/mongoose/user-mongoose-repository-adapter";
import {ACCOUNT_SERVICE} from "@/domain/use-cases/account-service";
import {AccountServiceImpl} from "@/domain/use-cases/impl/account-service-impl";
import {ValidatorAdapter} from "@/infrastructure/driven-adapters/adapters/validator-adapter";
import {CHECK_EMAIL_REPOSITORY} from "@/domain/models/contracts/check-email-repository";
import {VALIDATIONS_REPOSITORY} from "@/domain/models/contracts/validations-repository";
import {HASH_REPOSITORY} from "@/domain/models/contracts/hash-repository";
import {BcryptAdapter} from "@/infrastructure/driven-adapters/adapters/bcrypt-adapter";
import {HASH_COMPARE_REPOSITORY} from "@/domain/models/contracts/hash-compare-repository";
import {ENCRYPT_REPOSITORY} from "@/domain/models/contracts/encrypt-repository";
import {JwtAdapter} from "@/infrastructure/driven-adapters/adapters/jwt-adapter";
import {AUTH_SERVICE} from "@/domain/use-cases/auth-service";
import {AuthServiceImpl} from "@/domain/use-cases/impl/auth-service-impl";
import {UPDATE_TOKEN_REPOSITORY} from "@/domain/models/contracts/update-access-token-repository";
import {LOAD_ACCOUNT_BY_EMAIL_REPOSITORY} from "@/domain/models/contracts/load-account-by-email-repository";

export const adapters = [
    {
        provide: ACCOUNT_REPOSITORY,
        useClass: UserMongooseRepositoryAdapter
    },
    {
        provide: CHECK_EMAIL_REPOSITORY,
        useClass: UserMongooseRepositoryAdapter
    },
    {
        provide: VALIDATIONS_REPOSITORY,
        useClass: ValidatorAdapter
    },
    {
        provide: HASH_REPOSITORY,
        useClass: BcryptAdapter
    },
    {
        provide: HASH_COMPARE_REPOSITORY,
        useClass: BcryptAdapter
    },
    {
        provide: ENCRYPT_REPOSITORY,
        useClass: JwtAdapter
    },
    {
        provide: UPDATE_TOKEN_REPOSITORY,
        useClass: UserMongooseRepositoryAdapter
    },
    {
        provide: LOAD_ACCOUNT_BY_EMAIL_REPOSITORY,
        useClass: UserMongooseRepositoryAdapter
    }
];

export const services = [
    {
        provide: ACCOUNT_SERVICE,
        useClass: AccountServiceImpl
    },
    {
        provide: AUTH_SERVICE,
        useClass: AuthServiceImpl
    }
];
