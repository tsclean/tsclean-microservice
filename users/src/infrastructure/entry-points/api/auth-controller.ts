import {Mapping, Get, Post, Body, Adapter} from "@tsclean/core";
import {
    badRequest,
    HttpResponse,
    ok,
    serverError,
    unauthorized
} from "@/infrastructure/entry-points/helpers/http/status-code";
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

            const validation = await this.validationsRepository.validation(data, toValidate);
            if (!validation?.isValid && validation?.errors) return badRequest(validation.errors);

            const auth = await this.authService.auth({email, password});

            if (!auth) return unauthorized();

            return ok(auth);
        } catch (err) {
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