import User from "../models/user.js"

const registerUser = async (response) => {
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

        const savedUser = await newUser.save();
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

export default registerUser;