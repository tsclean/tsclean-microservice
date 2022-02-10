import {Mapping, Post, Body, Adapter} from "@tsclean/core";
import {ACCOUNT_SERVICE, IAccountService} from "@/domain/use-cases/account-service";
import {
    badRequest,
    forbidden,
    HttpResponse,
    ok,
    serverError
} from "@/infrastructure/entry-points/helpers/http/status-code";
import {IValidationRepository, VALIDATION_REPOSITORY} from "@/domain/models/contracts/validation-repository";
import {CHECK_EMAIL_REPOSITORY, ICheckEmailRepository} from "@/domain/models/contracts/check-email-repository";
import {EmailInUseError} from "@/infrastructure/entry-points/helpers/http/errors";

@Mapping('api/v1/account')
export class AccountController {

    constructor(
        @Adapter(ACCOUNT_SERVICE)
        private readonly accountService: IAccountService,
        @Adapter(VALIDATION_REPOSITORY)
        private readonly validation: IValidationRepository,
        @Adapter(CHECK_EMAIL_REPOSITORY)
        private readonly checkEmailRepository: ICheckEmailRepository
    ) {
    }

    @Post()
    async accountController(@Body() data: AccountController.Request): Promise<HttpResponse> {

        try {
            const error = await this.validation.validate(data);
            if (error) return badRequest(error);

            const {name, email, password} = data;
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
