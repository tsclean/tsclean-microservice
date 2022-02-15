import {Mapping, Get, Post, Body, Adapter} from "@tsclean/core";
import {badRequest, HttpResponse, ok, serverError} from "@/infrastructure/entry-points/helpers/http/status-code";
import {IValidationsRepository, VALIDATIONS_REPOSITORY} from "@/domain/models/contracts/validations-repository";
import {AUTH_SERVICE, IAuthService} from "@/domain/use-cases/auth-service";

@Mapping('api/v1/auth')
export class AuthController {

    constructor(
        @Adapter(VALIDATIONS_REPOSITORY)
        private readonly validationsRepository: IValidationsRepository,
        @Adapter(AUTH_SERVICE)
        private readonly authService: IAuthService
    ) {
    }

    @Post()
    async authController(@Body() data: AuthController.Request): Promise<HttpResponse> {

        try {
            const toValidate: string[] = ["email", "password"]

            const {email, password} = data;

            const {errors, isValid} = await this.validationsRepository.validation(data, toValidate);
            if (!isValid) return badRequest(errors);

            const auth = await this.authService.auth({email, password});

            return ok(auth);
        } catch (err) {
            console.log(err)
            return serverError(err);
        }
    }
}

export namespace AuthController {
    export type Request = {
        email: string;
        password: string;
    }
}