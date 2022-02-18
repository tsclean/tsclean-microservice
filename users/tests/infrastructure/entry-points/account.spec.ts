import faker from '@faker-js/faker'
import {AccountController} from "@/infrastructure/entry-points/api/account-controller";
import {AccountServiceSpy, AuthenticationSpy} from "@/tests/domain/mocks";
import {ValidationsSpy} from "@/tests/domain/mocks/validations-spy";
import {
    EmailInUseError,
    MissingParamError,
    ServerError,
    throwError
} from "@/infrastructure/entry-points/helpers/http/errors";
import {badRequest, forbidden, ok, serverError} from "@/infrastructure/entry-points/helpers/http/status-code";
import {CheckAccountByEmailRepositorySpy} from "@/tests/domain/mocks/check-account-spy";

const mockRequest = (): AccountController.Request => {
    const password = faker.internet.password();
    return  {
        name:  faker.name.findName(),
        email:  faker.internet.email(),
        password,
        passwordConfirmation: password
    }
}

type SutTypes = {
    sut: AccountController;
    accountServiceSpy: AccountServiceSpy;
    validationSpy: ValidationsSpy;
    authenticationSpy: AuthenticationSpy;
}

const makeSut = (): SutTypes => {
    const accountServiceSpy = new AccountServiceSpy();
    const validationSpy = new ValidationsSpy();

    const authenticationSpy = new AuthenticationSpy();
    const sut = new AccountController(accountServiceSpy, validationSpy, authenticationSpy);
    return {
        sut, accountServiceSpy, validationSpy, authenticationSpy
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

    it('should return 403 if validation returns an error', async function () {
        const {sut} = makeSut();
        const response = await sut.accountController(mockRequest());
        expect(response).toEqual(forbidden(new EmailInUseError()));
    });

    it('should return 200 if data is valid', async function () {
        const {sut, authenticationSpy, accountServiceSpy} = makeSut();
        accountServiceSpy.result = false;
        const response = await sut.accountController(mockRequest());
        expect(response).toEqual(ok(authenticationSpy.result))
    });

    it("Should returns an error when the name is missing", async function () {
        const {sut, validationSpy, accountServiceSpy} = makeSut();
        accountServiceSpy.result = false;
        validationSpy.error = new MissingParamError(faker.random.word())
        const httpResponse = await sut.accountController(mockRequest())
        const result = {
            "body": "{\"name\":\"MissingParamError\"}",
            "statusCode": httpResponse.statusCode = 422
        }
        expect(result).toEqual(badRequest(JSON.stringify(validationSpy.error)))
    });
})
