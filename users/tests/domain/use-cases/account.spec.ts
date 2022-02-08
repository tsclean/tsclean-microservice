import {AccountServiceImpl} from "@/domain/use-cases/impl/account-service-impl";
import {AccountServiceSpy, mockAddAccountParams} from "@/tests/domain/mocks";

type SutTypes = {
    sut: AccountServiceImpl;
    accountServiceSpy: AccountServiceSpy
}

const makeSut = (): SutTypes => {
    const accountServiceSpy = new AccountServiceSpy();
    const sut = new AccountServiceImpl(accountServiceSpy);
    return { sut, accountServiceSpy }
}

describe('Account use case', () => {
    it('should call account service with correct values', async function () {
        const { sut, accountServiceSpy } = makeSut();
        const addAccountParams = mockAddAccountParams();
        await sut.account(addAccountParams);
        expect(accountServiceSpy.params).toEqual({
            name: addAccountParams.name,
            email: addAccountParams.email,
            password: addAccountParams.password
        })
    });

    it('should return true on success', async function () {
        const { sut } = makeSut();
        const valid = await sut.account(mockAddAccountParams());
        expect(valid).toBe(true);
    });
})
