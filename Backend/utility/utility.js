import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT;
const dbURL = process.env.DB_URL;
let imageRouteCalled = false;
let postRouteCalled = false;

const getCurrentDate = () => {
    const currentDate = new Date();
    return `${currentDate.getFullYear()}. ${(currentDate.getMonth() + 1 < 10) ? "0" + (currentDate.getMonth() + 1) : currentDate.getMonth() + 1} ${(currentDate.getDate() < 10) ? "0" + currentDate.getDate() : currentDate.getDate()}`
}

const generateID = () => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';
    let generatedID = "";

    for (let i = 0; i < 32; i++) {
        generatedID += charset[Math.floor(Math.random() * charset.length)];
    }

    return generatedID;
}

let generatedArticleID = generateID();

const idSetter = (req, res, next) => {
    req.body.articleID = generatedArticleID;
    next()
}

const generateNewID = () => {
    generatedArticleID = generateID();
    imageRouteCalled = false;
    postRouteCalled = false;
}

const verifyGoogleToken = async (token) => {
    const url = `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`;

    try {
        const raw = await fetch(url);
        const response = await raw.json();
        if (response.error_description) {
            return false;
        }
        return response;
    } catch (err) {
        throw err;
    }

}

export { port, dbURL, getCurrentDate, generatedArticleID, idSetter, generateNewID, verifyGoogleToken };