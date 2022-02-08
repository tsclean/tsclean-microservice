import {IValidation} from "@/infrastructure/entry-points/helpers/contract/validation";

export class ValidationsSpy implements IValidation {
    error: Error = null;
    input: any;

    validate(input: any): Error {
        this.input = input;
        return this.error
    }

}
