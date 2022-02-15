export const ENCRYPT_REPOSITORY = 'ENCRYPT_REPOSITORY';

export interface IEncryptRepository {
    encrypt: (text: string | number) => Promise<string>
}