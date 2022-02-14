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

@Mapping('api/v1/account')
export class AccountController {
    constructor(
        @Adapter(ACCOUNT_SERVICE)
        private readonly accountService: IAccountService,
        @Adapter(CHECK_EMAIL_REPOSITORY)
        private readonly checkEmailRepository: ICheckEmailRepository,
        @Adapter(VALIDATIONS_REPOSITORY)
        private readonly validationsRepository: IValidationsRepository
    ) {
    }

    @Post()
    async accountController(@Body() data: AccountController.Request): Promise<HttpResponse> {
        try {

            const toValidate: string[] = ["name", "email", "password", "passwordConfirmation"]

            const {name, email, password} = data;

            const {errors} = await this.validationsRepository.validation(data, toValidate);
            if (errors) return badRequest(errors)

            const accountExist = await this.checkEmailRepository.checkEmail(email);
            if (accountExist) return forbidden(new EmailInUseError());

            const user = await this.accountService.account({name, email, password});

            return ok(user)
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
