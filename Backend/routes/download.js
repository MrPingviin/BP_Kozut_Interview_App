import express from "express";
import mongoose from "mongoose";
import Article from "../models/article.js";
import User from "../models/user.js";
import userAuth from "../middlewares/userAuth.js";
const router = express.Router();

router.post("/articles", userAuth, async (req, res) => {
    try {
        const response = await Article.find();
        res.status(200).json(response);
    } catch (err) {
        res.status(503).json({ message: err.message });
    }
});

router.post("/article", userAuth, async (req, res) => {
    try {
        const response = await Article.find({
            articleID: req.headers.articleid
        });
        res.status(200).json(response);
    } catch (err) {
        res.status(503).json({ message: err.message });
    }
});

router.post("/user", userAuth, async (req, res) => {
    try {
        const response = await User.find({
            googleID: req.headers.googleid
        });
        res.status(200).json(response);
    } catch (err) {
        res.status(503).json({ message: err.message });
    }
});

export default router;