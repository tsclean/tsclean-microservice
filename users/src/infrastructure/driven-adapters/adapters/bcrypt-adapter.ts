import bcrypt from 'bcrypt'
import {IHashCompareRepository} from "@/domain/models/contracts/hash-compare-repository";

export class BcryptAdapter implements IHashCompareRepository{
    async compare(text: string, digest: string): Promise<boolean> {
        return bcrypt.compare(text, digest)
    }
}