import express from "express";
import Article from "../models/article.js";
import userAuth from "../middlewares/userAuth.js";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imageRemover = (req, res, next) => {
    fs.rm(`${__dirname}/../images/${req.headers.articleid}.webp`, (err) => {
        next();
    });
}

router.delete("/post", userAuth, imageRemover, async (req, res) => {
    try {
        const response = await Article.deleteOne({
            articleID: req.headers.articleid
        });
        res.status(200).json({ message: "Article successfully deleted!" });
    } catch (err) {
        res.status(503).json({ message: "Error! Looks like the DB is down!" });
    }
});

export default router;