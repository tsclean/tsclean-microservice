import {IValidationRepository} from "@/domain/models/contracts/validation-repository";


export class ValidationsSpy implements IValidationRepository {
    error: Error = null;
    input: any;

    async validate(input: any): Promise<Error> {
        this.input = input;
        return this.error
    }

}
