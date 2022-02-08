import {IValidationService} from "@/domain/use-cases/validation-service";


export class ValidationsSpy implements IValidationService {
    error: Error = null;
    input: any;

    async validate(input: any): Promise<Error> {
        this.input = input;
        return this.error
    }

}
