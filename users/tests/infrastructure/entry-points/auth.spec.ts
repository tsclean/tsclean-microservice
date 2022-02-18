import {AuthController} from "@/infrastructure/entry-points/api/auth-controller";
import faker from "@faker-js/faker";
import {AuthenticationSpy, ValidationSpy} from "@/tests/domain/mocks";
import {badRequest, serverError, unauthorized} from "@/infrastructure/entry-points/helpers/http/status-code";
import {MissingParamError, throwError} from "@/infrastructure/entry-points/helpers/http/errors";

const mockRequest = ():AuthController.Request => ({
    email: faker.internet.email(),
    password: faker.internet.password()
})

type SutTypes = {
    sut: AuthController;
    authSpy: AuthenticationSpy;
    validationSpy: ValidationSpy;
}

const makeSut = (): SutTypes => {
    const authSpy = new AuthenticationSpy();
    const validationSpy = new ValidationSpy();
    const sut = new AuthController(validationSpy, authSpy);
    return {
        sut,
        validationSpy,
        authSpy
    }
}

describe('Auth Controller', () => {

    it('should call auth controller with correct values', async function () {
        const {sut, authSpy} = makeSut();
        const request = mockRequest();
        await sut.authController(request);
        expect(authSpy.params).toEqual({
            email: request.email,
            password: request.password
        })
    });

    it('should return 401 if invalid credentials are provided', async function () {
        const {sut, authSpy} = makeSut();
        authSpy.result = null;
        const response = await sut.authController(mockRequest());
        expect(response).toEqual(unauthorized());
    });

    it('should return 500 if authentication throws', async function () {
        const {sut, authSpy} = makeSut();
        jest.spyOn(authSpy, 'auth').mockImplementationOnce(throwError);
        const response = await sut.authController(mockRequest());
        expect(response).toEqual(serverError(new Error()));
    });

    it('Should return 400 if Validation returns an error', async () => {
        const { sut, validationSpy } = makeSut();
        validationSpy.error = new MissingParamError(faker.random.word())
        const response = await sut.authController({email: null, password: '123456'})
        const result = {
            "body": "{\"name\":\"MissingParamError\"}",
            "statusCode": response.statusCode = 422
        }
        expect(result).toEqual(badRequest(JSON.stringify(validationSpy.error)))
    })
})