import {ICheckEmailRepository} from "@/domain/models/contracts/check-email-repository";

export class CheckAccountByEmailRepositorySpy implements ICheckEmailRepository {
    email: string
    result = false

    async checkEmail(email: string): Promise<boolean> {
        this.email = email
        return this.result
    }
}
