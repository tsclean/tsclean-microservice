export const VALIDATION_REPOSITORY = 'VALIDATION_REPOSITORY';

export interface IValidationRepository {
    validate: (input: any) => Promise<Error | any[]>;
}
