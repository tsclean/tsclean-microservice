import faker from 'faker2'
import {AddUserParams} from "@/domain/models/user";

export const mockAddAccountParams = (): AddUserParams => ({
    name: faker.Name.findName(),
    email: faker.Internet.email(),
    password: '123456'
})
