import bcrypt from 'bcrypt'
import {IHashCompareRepository} from "@/domain/models/contracts/hash-compare-repository";
import {IHashRepository} from "@/domain/models/contracts/hash-repository";

export class BcryptAdapter implements IHashCompareRepository, IHashRepository {
    async compare(text: string, digest: string): Promise<boolean> {
        return bcrypt.compare(text, digest)
    }

    async hash(text: string): Promise<string> {
        return bcrypt.hash(text, 12);
    }
}