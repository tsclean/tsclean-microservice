import validator from "validator";
import {IValidationsRepository} from "@/domain/models/contracts/validations-repository";

export class ValidatorAdapter implements IValidationsRepository {

    async validation(data: any, toValidate: string[], file?: any): Promise<any> {
        let errors = {};

        if (toValidate.includes("email") && !validator.isEmail(data.email)) {
            errors["email"] = "Email is invalid";
        }

        for (const key in data) {
            if (toValidate.includes(key) && validator.isEmpty(data[key])) {
                errors[key] = `${key} is required`;
            }
        }

        return {errors};
    }
}

