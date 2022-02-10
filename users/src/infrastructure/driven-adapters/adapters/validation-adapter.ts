import {IValidationRepository} from "@/domain/models/contracts/validation-repository";
import {MissingParamError} from "@/infrastructure/entry-points/helpers/http/errors";
import {isEmpty} from "@tsclean/core";

export class ValidationAdapter implements IValidationRepository {

    async validate (input: any): Promise<Error | any[]> {
        const validations = [];
        for (const key in input) {
            let obj = {};
            obj[key] = `${key} is required`
            if (!input[key]) validations.push(obj);
        }

        if (!isEmpty(validations)) return validations;
    }
}


