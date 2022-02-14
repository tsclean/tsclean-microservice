import faker from 'faker2';
import {AccountController} from "@/infrastructure/entry-points/api/account-controller";
import {AccountServiceSpy} from "@/tests/domain/mocks";
import {ValidationsSpy} from "@/tests/domain/mocks/validations-spy";
import {MissingParamError, ServerError, throwError} from "@/infrastructure/entry-points/helpers/http/errors";
import {badRequest, ok, serverError} from "@/infrastructure/entry-points/helpers/http/status-code";
import {CheckAccountByEmailRepositorySpy} from "@/tests/domain/mocks/check-account-spy";

const mockRequest = (): AccountController.Request => {
    const password = '123456';
    return  {
        name:  "Theodora Mills",
        email:  "Andrew@kurt.com",
        password,
        passwordConfirmation: password
    }
}

type SutTypes = {
    sut: AccountController;
    accountServiceSpy: AccountServiceSpy;
    validationSpy: ValidationsSpy;
    checkByEmail: CheckAccountByEmailRepositorySpy;
}

const makeSut = (): SutTypes => {
    const accountServiceSpy = new AccountServiceSpy();
    const validationSpy = new ValidationsSpy();
    const checkByEmail = new CheckAccountByEmailRepositorySpy();
    const sut = new AccountController(accountServiceSpy, checkByEmail, validationSpy);
    return {
        sut, accountServiceSpy, validationSpy, checkByEmail
    }
}

describe('Account controller', () => {

    it('should return 500 if account throws', async function () {
        const {sut, accountServiceSpy} = makeSut();
        jest.spyOn(accountServiceSpy, 'account').mockImplementationOnce(throwError);
        const response = await sut.accountController(mockRequest());
        expect(response).toEqual(serverError(new ServerError(null)));
    });

    it('should call account with correct values', async function () {
        const {sut, accountServiceSpy} = makeSut();
        const request = mockRequest();
        await sut.accountController(request);
        expect(accountServiceSpy.params).toEqual({
            name: request.name,
            email: request.email,
            password: request.password
        })
    });

    it('should return  200 if data is valid', async function () {
        const {sut, accountServiceSpy} = makeSut();
        const response = await sut.accountController({name:"name", email:"email@doe.com", password:"123456", passwordConfirmation:"123456"});
        const result = {
            "body": true,
            "statusCode": response.statusCode = 200
        }
        expect(result).toEqual(ok(accountServiceSpy.result));
    });

    it('should return 400 if validation returns an error', async function () {
        const {sut, validationSpy} = makeSut();
        validationSpy.error = new MissingParamError("name");
        const response = await sut.accountController({name:"", email:"", password:"", passwordConfirmation:""});
        const result = {
            "body": "{\"name\":\"MissingParamError\"}",
            "statusCode": response.statusCode = 422
        }
        expect(result).toEqual(badRequest(JSON.stringify(validationSpy.error)));
    });
})
