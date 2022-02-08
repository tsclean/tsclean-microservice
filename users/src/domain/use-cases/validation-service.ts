export const VALIDATION_SERVICE = 'VALIDATION_SERVICE';

export interface IValidationService {
    validate: (input: any) => Promise<Error>;
}



