import {Mapping, Post, Body, Adapter} from "@tsclean/core";
import {ACCOUNT_SERVICE, IAccountService} from "@/domain/use-cases/account-service";
import {
    badRequest,
    forbidden,
    HttpResponse,
    ok,
    serverError
} from "@/infrastructure/entry-points/helpers/http/status-code";
import {CHECK_EMAIL_REPOSITORY, ICheckEmailRepository} from "@/domain/models/contracts/check-email-repository";
import {EmailInUseError} from "@/infrastructure/entry-points/helpers/http/errors";
import {IValidationsRepository, VALIDATIONS_REPOSITORY} from "@/domain/models/contracts/validations-repository";
import {AUTH_SERVICE, IAuthService} from "@/domain/use-cases/auth-service";

@Mapping('api/v1/account')
export class AccountController {
    constructor(
        @Adapter(ACCOUNT_SERVICE)
        private readonly accountService: IAccountService,
        @Adapter(VALIDATIONS_REPOSITORY)
        private readonly validationsRepository: IValidationsRepository,
        @Adapter(AUTH_SERVICE)
        private readonly authService: IAuthService
    ) {
    }

    @Post()
    async accountController(@Body() data: AccountController.Request): Promise<HttpResponse> {
        try {

            const toValidate: string[] = ["name", "email", "password", "passwordConfirmation"]

            const {name, email, password} = data;

            const validation = await this.validationsRepository.validation(data, toValidate);
            if (!validation?.isValid && validation?.errors) return badRequest(validation.errors);

            const accountExist = await this.accountService.account({name, email, password});
            if (accountExist) return forbidden(new EmailInUseError());

            const auth = await this.authService.auth({email, password});

            return ok(auth)
        } catch (err) {
            return serverError(err);
        }
    }
}

export namespace AccountController {
    export type Request = {
        name: string;
        email: string;
        password: string;
        passwordConfirmation: string;
    }
}
