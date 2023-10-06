import User from "../models/user.js"
import ErrorCodes from "../utility/errorCodes.js";

const getUser = async (id) => {
    try {
        const response = await User.find({
            googleID: id
        }).exec();

        if (response != []) {
            return response[0];
        } else {
            return false;
        }
    } catch (error) {
        console.error(error);
        return ErrorCodes.SERVER_ERROR;
    }
}

export default getUser;