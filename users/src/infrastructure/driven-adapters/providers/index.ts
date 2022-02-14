import {ACCOUNT_REPOSITORY} from "@/domain/models/contracts/account-repository";
import {UserMongooseRepositoryAdapter} from "@/infrastructure/driven-adapters/adapters/orm/mongoose/user-mongoose-repository-adapter";
import {ACCOUNT_SERVICE} from "@/domain/use-cases/account-service";
import {AccountServiceImpl} from "@/domain/use-cases/impl/account-service-impl";
import {ValidatorAdapter} from "@/infrastructure/driven-adapters/adapters/validator-adapter";
import {CHECK_EMAIL_REPOSITORY} from "@/domain/models/contracts/check-email-repository";
import {VALIDATIONS_REPOSITORY} from "@/domain/models/contracts/validations-repository";

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
    }
];

export const services = [
    {
        provide: ACCOUNT_SERVICE,
        useClass: AccountServiceImpl
    }
];
