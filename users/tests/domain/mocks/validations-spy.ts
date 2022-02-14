import {IValidationsRepository} from "@/domain/models/contracts/validations-repository";

export class ValidationsSpy implements IValidationsRepository {
    error: Error = null;
    input: any;

    async validation(data: any, toValidate: string[]): Promise<any> {
        this.input = data;
        return this.error
    }

}
