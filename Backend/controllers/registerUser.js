import User from "../models/user.js"

const registerUser = async (response) => {
    let isUserExist = false;
    try {
        const newUser = new User({
            firstName: response.given_name,
            lastName: response.family_name,
            avatarURL: response.picture,
            registeredAt: Date.now(),
            isEditor: true,
            googleID: response.sub,
            email: response.email,
            locale: response.locale
        });

        const findUser = await User.find({
            googleID: response.sub
        }).exec();
        

        if (findUser.length != 0) {
            isUserExist = true;
        }

        if (!isUserExist) {
            await newUser.save();
            return true;
        } else {
            return false;
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export default registerUser;