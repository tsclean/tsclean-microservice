import {UserMongooseRepositoryAdapter} from "@/infrastructure/driven-adapters/adapters/orm/mongoose/user-mongoose-repository-adapter";
import {connect, connection} from "mongoose";
import {mockAddAccountParams} from "@/tests/domain/mocks";

const makeSut = () => {
    return new UserMongooseRepositoryAdapter();
}

let db = connection;

describe('User mongoose adapter', () => {
    beforeAll(async () => {
        await connect(process.env.MONGO_URL);
        db.on('open', () => console.log('Database starting...'))
    })

    beforeEach(() => {
        if (db.collection('accounts').countDocuments()) {
            return db.collection('accounts').deleteMany({});
        }
    })

    afterAll(async () => {
        return db.close();
    });

    describe('account', () => {
        it('should return true with user success', async function () {
            const sut = makeSut();
            const account = await sut.account(mockAddAccountParams());
            expect(account).toBeTruthy();
        });
    })
})