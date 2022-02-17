import jwt from 'jsonwebtoken';
import {JwtAdapter} from "@/infrastructure/driven-adapters/adapters/jwt-adapter";

jest.mock('jsonwebtoken', () => ({
    async sign(): Promise<string> {
        return 'token';
    },

    async verify(): Promise<string> {
        return 'value';
    }
}));

const makeSut = (): JwtAdapter => {
    return new JwtAdapter();
}

describe('Jwt Adapter', () => {
    it('should call sign with correct values', async function () {
        const sut = makeSut();
        const signSpy = jest.spyOn(jwt, 'sign');
        await sut.encrypt('id');
        expect(signSpy).toHaveBeenCalledWith({id: 'id'}, 'secret')
    });
})