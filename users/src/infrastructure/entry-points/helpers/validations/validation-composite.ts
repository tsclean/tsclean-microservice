import {Adapter} from "@tsclean/core";
import {IValidation, VALIDATION} from "@/infrastructure/entry-points/helpers/contract/validation";


export class ValidationComposite implements IValidation {
    constructor(
        @Adapter(VALIDATION)
        private readonly validations: IValidation[]
    ) {
    }

    validate(input: any): Error {
        for (const validation of this.validations) {
            const error = validation.validate(input);
            if (error) return error;
        }
    }
}
