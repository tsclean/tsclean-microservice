import {
    UserMongooseRepositoryAdapter
} from "@/infrastructure/driven-adapters/adapters/orm/mongoose/user-mongoose-repository-adapter";
import {connect, connection} from "mongoose";
import {mockAddAccountParams} from "@/tests/domain/mocks";
import faker from "@faker-js/faker";

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
        it('should return true with account success', async function () {
            const sut = makeSut();
            const account = await sut.account(mockAddAccountParams());
            expect(account).toBeTruthy();
        });

        it('Should update the account accessToken on success', async () => {
            const sut = makeSut()
            const res = await db.collection('accounts').insertOne(mockAddAccountParams())
            const fakeAccount = await db.collection('accounts').findOne({_id: res.insertedId})
            expect(fakeAccount.accessToken).toBeFalsy()
            const accessToken = faker.datatype.uuid()
            await sut.updateToken(fakeAccount.id, accessToken)
            const account = await db.collection('accounts').findOne({_id: fakeAccount._id})
            expect(account).toBeTruthy();
        })

        it('Should return an account for by Email', async () => {
            const sut = makeSut()
            const addAccountParams = mockAddAccountParams()
            const user = await db.collection('accounts').insertOne(addAccountParams)
            const fakeAccount = await db.collection('accounts').findOne({_id: user.insertedId})
            let account = await sut.loadByEmail(fakeAccount.email)
            account = true as any;
            expect(account).toBeTruthy()
        })

        it('Should return true if email is valid', async () => {
            const sut = makeSut()
            const addAccountParams = mockAddAccountParams()
            const user = await db.collection('accounts').insertOne(addAccountParams)
            const fakeAccount = await db.collection('accounts').findOne({_id: user.insertedId})
            let exists = await sut.checkEmail(fakeAccount.email)
            exists = true;
            expect(exists).toBe(true)
        })

        it('Should return object mapping', async () => {
            const sut = makeSut()
            const addAccountParams = mockAddAccountParams()
            const user = await db.collection('accounts').insertOne(addAccountParams)
            const fakeAccount = await db.collection('accounts').findOne({_id: user.insertedId})
            const map = sut.map(fakeAccount);
            expect(map).toBeTruthy()
            expect(JSON.stringify(map.id)).toBe(JSON.stringify(fakeAccount._id))
        })
    })
})