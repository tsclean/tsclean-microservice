import faker from '@faker-js/faker'
import {AddUserParams} from "@/domain/models/user";
import {IAuthService} from "@/domain/use-cases/auth-service";
import {IValidationsRepository} from "@/domain/models/contracts/validations-repository";

export const mockAddAccountParams = (): AddUserParams => ({
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password()
})

export class AuthenticationSpy implements IAuthService {
    params: IAuthService.Params
    result = {
        accessToken: faker.datatype.uuid(),
        name: faker.name.findName()
    }

    async auth (params: IAuthService.Params): Promise<IAuthService.Result> {
        this.params = params
        return this.result
    }
}

export class ValidationSpy implements IValidationsRepository {
    error: Error = null
    input: any

    async validation(data: any, toValidate: string[], file: any): Promise<any> {
        this.input = data
        return this.error
    }
}
