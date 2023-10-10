import registerUser from "./registerUser";
import { expect, test, describe } from 'vitest'
import dbConnect from "../utility/dbConnect";
import User from "../models/user.js";

describe("DB - registerUser tests: ", async () => {
    dbConnect(true);

    const mockUser = {
        given_name: "John",
        family_name: "Doe",
        picture: "https://t4.ftcdn.net/jpg/03/32/59/65/360_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg",
        registeredAt: Date.now(),
        isEditor: true,
        sub: "12345678910",
        email: "johndoe@doemail.com",
        locale: "en"
    }

    test('DB - Tries to register a brand new user to the users collection.', async () => {


        expect(await registerUser(mockUser)).toBe(true);
        await User.deleteOne({ googleID: mockUser.sub });
    });

    test('DB - Tries to register a new user with an existing googleID.', async () => {

        expect(await registerUser(mockUser)).toBe(true);
        expect(await registerUser(mockUser)).toBe(false);
        await User.deleteOne({ googleID: mockUser.sub });
    });
});