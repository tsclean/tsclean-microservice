import bcrypt from 'bcrypt';
import {BcryptAdapter} from "@/infrastructure/driven-adapters/adapters/bcrypt-adapter";

jest.mock('bcrypt', () => ({
    async hash(): Promise<string> {
        return 'hash';
    },

    async compare(): Promise<boolean> {
        return true;
    }
}))

const salt = 12;

const makeSut = () => {
    return new BcryptAdapter();
}

describe('Bcrypt adapter', () => {
    it('should call hash with correct value', async function () {
        const sut = makeSut();
        const hashSpy = jest.spyOn(bcrypt, 'hash');
        await sut.hash('value');
        expect(hashSpy).toHaveBeenCalledWith('value', salt);
    });

    it('should call compare with correct values', async function () {
        const sut = makeSut();
        const compareSpy = jest.spyOn(bcrypt, 'compare');
        await sut.compare('value', 'hash');
        expect(compareSpy).toHaveBeenCalledWith('value', 'hash');
    });
})