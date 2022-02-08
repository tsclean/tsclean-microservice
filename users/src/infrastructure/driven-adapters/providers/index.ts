import {ACCOUNT_REPOSITORY} from "@/domain/models/contracts/account-repository";
import {UserMongooseRepositoryAdapter} from "@/infrastructure/driven-adapters/adapters/orm/mongoose/user-mongoose-repository-adapter";
import {ACCOUNT_SERVICE} from "@/domain/use-cases/account-service";
import {AccountServiceImpl} from "@/domain/use-cases/impl/account-service-impl";
import {VALIDATION_SERVICE} from "@/domain/use-cases/validation-service";
import {ValidationServiceImpl} from "@/domain/use-cases/impl/validation-service-impl";

export const adapters = [
    {
        provide: ACCOUNT_REPOSITORY,
        useClass: UserMongooseRepositoryAdapter
    }
];

export const services = [
    {
        provide: ACCOUNT_SERVICE,
        useClass: AccountServiceImpl
    },
    {
        provide: VALIDATION_SERVICE,
        useClass: ValidationServiceImpl
    }
];
