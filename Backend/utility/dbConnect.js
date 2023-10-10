import mongoose from "mongoose";
import { port, dbURL } from "./utility.js";

const dbConnect = async (test) => {
    if (test === undefined) {
        test = false
    };
    try {
        await mongoose.connect(dbURL);
        if (!test) {
            console.log("Connection to the Database was successful!");
            console.log("Backend is running on port " + port + "!");
            console.log("Mongoose ready state: ", mongoose.connection.readyState);
        }
        return true;
    } catch (err) {
        throw err;
    }
}

export default dbConnect;