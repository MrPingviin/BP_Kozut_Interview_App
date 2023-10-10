import { expect, test, describe } from 'vitest'
import getUser from './getUser.js'
import dbConnect from '../utility/dbConnect.js'


describe("DB - getUser tests: ", () => {
    dbConnect(true);
    test('DB - Tries to fetch an non-exist user from the users collection.', async () => {
        const response = await getUser("1234");
        expect(response).toBe(undefined);
    })

    test('DB - Tries to fetch an exist user from the users collection.', async () => {
        const response = await getUser("109005141916428914528");
        expect(response).toBeTruthy();
    })
})
