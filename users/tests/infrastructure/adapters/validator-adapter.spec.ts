import validator from "validator";
import {ValidatorAdapter} from "@/infrastructure/driven-adapters/adapters/validator-adapter";

jest.mock("validator", () => ({
    isEmpty(): boolean {
        return true;
    },

    isEmail(): boolean {
        return true;
    }
}))

const makeSut = (): ValidatorAdapter => {
    return new ValidatorAdapter();
}

describe("Validator adapter", () => {
    it('should return false if isEmpty return false', async function () {
        const sut = makeSut();
        jest.spyOn(validator, "isEmpty");
        const valid = await sut.validation({name: ""}, ["name"]);
        expect(JSON.stringify(valid)).toBe(JSON.stringify({"errors": {"name": "name is required"}}));
    });

    it('should return false if isEmail return false', async function () {
        const sut = makeSut();
        jest.spyOn(validator, "isEmail").mockReturnValueOnce(false);
        const valid = await sut.validation("invaliddoe.com", ["email"]);
        expect(JSON.stringify(valid)).toBe(JSON.stringify({"errors": {"email": "Email is invalid"}}));
    });
})