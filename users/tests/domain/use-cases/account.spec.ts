import {AccountServiceImpl} from "@/domain/use-cases/impl/account-service-impl";
import {AccountServiceSpy, HashSpy, mockAddAccountParams} from "@/tests/domain/mocks";
import {CheckAccountByEmailRepositorySpy} from "@/tests/domain/mocks/check-account-spy";

type SutTypes = {
    sut: AccountServiceImpl;
    hashSpy: HashSpy;
    accountServiceSpy: AccountServiceSpy;
    checkByEmail: CheckAccountByEmailRepositorySpy;
}

const makeSut = (): SutTypes => {
    const accountServiceSpy = new AccountServiceSpy();
    const hashSpy = new HashSpy();
    const checkByEmail = new CheckAccountByEmailRepositorySpy();
    const sut = new AccountServiceImpl(accountServiceSpy, hashSpy, checkByEmail);
    return { sut, accountServiceSpy, hashSpy, checkByEmail }
}

describe('Account use case', () => {
    it('should call account service with correct values', async function () {
        const { sut, accountServiceSpy, hashSpy } = makeSut();
        const addAccountParams = mockAddAccountParams();
        await sut.account(addAccountParams);
        expect(accountServiceSpy.params).toEqual({
            name: addAccountParams.name,
            email: addAccountParams.email,
            password: hashSpy.digest
        })
    });

    it('should return true on success', async function () {
        const { sut } = makeSut();
        const valid = await sut.account(mockAddAccountParams());
        expect(valid).toBe(true);
    });

    it('should call Hash with correct text', async function () {
        const {sut, hashSpy} = makeSut();
        const addAccountParams = mockAddAccountParams();
        await sut.account(addAccountParams);
        expect(hashSpy.text).toBe(addAccountParams.password);
    });
})
