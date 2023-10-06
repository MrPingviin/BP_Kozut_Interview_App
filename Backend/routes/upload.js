import express from "express";
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';
import Article from "../models/article.js";
import { generatedArticleID, idSetter, generateNewID } from "../utility/utility.js";
import userAuth from "../middlewares/userAuth.js";
const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imageHandler = (request, res, next) => {
    console.log("imagehandler article id ", generatedArticleID)
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `${__dirname}/../images/`);
        },
        filename: (req, file, cb) => {
            cb(null, `${generatedArticleID}.webp`);
        },
    });
    const upload = multer({ storage });
    upload.single('image')(request, res, (err) => {
        next();
    });
}

router.post("/post", userAuth, idSetter, imageHandler, async (req, res) => {

    console.log("POST => ", req.headers)
    console.log("router article id ", generatedArticleID)
    try {
        const newArticle = new Article({
            title: req.headers.title,
            text: req.headers.text,
            createdAtDisplayDate: req.headers.displaydate,
            createdAt: req.headers.date,
            createdBy: req.headers.createdby,
            imageURL: "/images/" + generatedArticleID + ".webp",
            articleID: generatedArticleID
        });
        await newArticle.save().then(() => {
            generateNewID();
        });
        res.status(200).json({ message: "Article successfully created!" });
    } catch (err) {
        res.status(503).json({ message: "Error! Looks like the DB is down!" });
    }
})

export default router;