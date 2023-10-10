import { expect, test, describe } from 'vitest'
import dbConnect from './utility/dbConnect.js';

describe("DB - Connection: ", () => {
    test('Tries to connect to the remote DB', async () => {
        const response = await dbConnect(true);
        expect(response).toBe(true);
    })
})