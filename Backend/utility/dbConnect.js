import mongoose from "mongoose";
import { port, dbURL } from "./utility.js";

const dbConnect = async () => {
    try {
        await mongoose.connect(dbURL);
        console.log("Connection to the Database was successful!");
        console.log("Backend is running on port " + port + "!");
        console.log("Mongoose ready state: ", mongoose.connection.readyState);
    } catch (err) {
        throw err;
    }
}

export default dbConnect;