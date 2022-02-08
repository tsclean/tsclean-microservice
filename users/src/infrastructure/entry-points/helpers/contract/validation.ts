export const VALIDATION = 'VALIDATION';

export interface IValidation {
    validate: (input: any) => Error;
}
