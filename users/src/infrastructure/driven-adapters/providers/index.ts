import {ACCOUNT_REPOSITORY} from "@/domain/models/contracts/account-repository";
import {UserMongooseRepositoryAdapter} from "@/infrastructure/driven-adapters/adapters/orm/mongoose/user-mongoose-repository-adapter";
import {ACCOUNT_SERVICE} from "@/domain/use-cases/account-service";
import {AccountServiceImpl} from "@/domain/use-cases/impl/account-service-impl";
import {VALIDATION_REPOSITORY} from "@/domain/models/contracts/validation-repository";
import {ValidationAdapter} from "@/infrastructure/driven-adapters/adapters/validation-adapter";
import {CHECK_EMAIL_REPOSITORY} from "@/domain/models/contracts/check-email-repository";

export const adapters = [
    {
        provide: ACCOUNT_REPOSITORY,
        useClass: UserMongooseRepositoryAdapter
    },
    {
        provide: VALIDATION_REPOSITORY,
        useClass: ValidationAdapter
    },
    {
        provide: CHECK_EMAIL_REPOSITORY,
        useClass: UserMongooseRepositoryAdapter
    }
];

export const services = [
    {
        provide: ACCOUNT_SERVICE,
        useClass: AccountServiceImpl
    }
];
