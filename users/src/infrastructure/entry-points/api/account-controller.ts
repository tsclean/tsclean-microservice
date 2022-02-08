import {Mapping, Post, Body, Adapter} from "@tsclean/core";
import {ACCOUNT_SERVICE, IAccountService} from "@/domain/use-cases/account-service";
import {IValidationService, VALIDATION_SERVICE} from "@/domain/use-cases/validation-service";
import {badRequest, HttpResponse, ok, serverError} from "@/infrastructure/entry-points/helpers/http/status-code";

@Mapping('api/v1/account')
export class AccountController {

    constructor(
        @Adapter(ACCOUNT_SERVICE)
        private readonly accountService: IAccountService,
        @Adapter(VALIDATION_SERVICE)
        private readonly validation: IValidationService
    ) {
    }

    @Post()
    async accountController(@Body() data: AccountController.Request): Promise<HttpResponse> {

        try {
            const error = await this.validation.validate(data);
            if (error) return badRequest(error);

            const {name, email, password} = data;

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
