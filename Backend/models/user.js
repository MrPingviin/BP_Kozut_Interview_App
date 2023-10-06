import mongoose from "mongoose";

const User = mongoose.model('User', {
    firstName: String,
    lastName: String,
    avatarURL: String,
    registeredAt: Date,
    isEditor: Boolean,
    googleID: String,
    email: String,
    locale: String
});

export default User;