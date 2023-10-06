import express from "express";
import { verifyGoogleToken } from "../utility/utility.js";
import getUser from "../controllers/getUser.js";
import registerUser from "../controllers/registerUser.js";

const router = express.Router();

router.post("/google/callback", async (req, res) => {
    const token = req.body.credential;
    try {
        const response = await verifyGoogleToken(token)
        if (!response) {
            res.status(502).json({ message: "Wrong token!" });
        } else {
            const userFinder = await getUser(response.sub);
            if (userFinder) {
                res.status(200).redirect(`http://localhost:5173/home?googleID=${userFinder.googleID}`);
            } else {
                await registerUser(response)
                const newUserSearch = await getUser(response.sub);
                res.status(200).redirect(`http://localhost:5173/home?googleID=${newUserSearch.googleID}`);
            }
        }
    } catch (err) {
        throw err;
    }
});

export default router