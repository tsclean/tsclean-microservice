export const VALIDATIONS_REPOSITORY = "VALIDATIONS_REPOSITORY";

export interface IValidationsRepository {
    validation: (data: any, toValidate: string[], file?: any) => Promise<any>;
}