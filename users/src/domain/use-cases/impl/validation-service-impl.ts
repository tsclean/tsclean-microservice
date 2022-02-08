import {IValidationService} from "@/domain/use-cases/validation-service";

export class ValidationServiceImpl implements IValidationService {

    validations: IValidationService[]

    async validate(input: any): Promise<Error> {
        for (const validation of this.validations) {
            const error = validation.validate(input);
            if (error) return error;
        }
    }
}
