export const HASH_COMPARE_REPOSITORY = 'HASH_COMPARE_REPOSITORY';

export interface IHashCompareRepository {
    compare:(text: string, digest: string) => Promise<boolean>
}