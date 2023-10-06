import express from "express";
import Article from "../models/article.js";
import userAuth from "../middlewares/userAuth.js";
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
const router = express.Router();
let filename = "";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/../images/`);
    },
    filename: (req, file, cb) => {
        cb(null, `${filename}.webp`);
    },
});

const upload = multer({ storage });

const filenamer = (req, res, next) => {
    filename = req.headers.articleid;
    next()
};

const getModificationDate = () => {
    const currentDate = new Date();
    return `${currentDate.getFullYear()}. ${(currentDate.getMonth() + 1 < 10) ? "0" + (currentDate.getMonth() + 1) + "." : currentDate.getMonth() + 1 + "."} ${(currentDate.getDate() < 10) ? "0" + currentDate.getDate() + "." : currentDate.getDate() + "."} / ${currentDate.getHours() < 10 ? "0" + currentDate.getHours() + ":" : currentDate.getHours() + ":"}${currentDate.getMinutes() < 10 ? "0" + currentDate.getMinutes() : currentDate.getMinutes()}`
}

router.patch("/post", userAuth, filenamer, upload.single('image'), async (req, res) => {
    console.log("Route req file ", req.file)
    try {
        const response = await Article.updateOne({
            articleID: req.headers.articleid
        }, {
            title: req.headers.title,
            text: req.headers.text,
            modifiedAtDisplayDate: getModificationDate(),
            modifiedAt: Date.now(),
            modifiedBy: req.headers.googleid
        });
        res.status(200).json({ message: "Article successfully updated!" });
    } catch (err) {
        res.status(503).json({ message: "Error! Looks like the DB is down!" });
    }
});


export default router;