import express from "express";
import getUser from "../controllers/getUser.js";
import ErrorCodes from "../utility/errorCodes.js";
const router = express.Router();


router.post("/", async (req, res) => {
    try {
        const response = await getUser(req.body.googleID);

        if (response === ErrorCodes.SERVER_ERROR) {
            res.status(503).send();
        }

        if (response) {
            res.status(200).json(response);
        }
        res.status(404).send()
    } catch (err) {
        throw err;
    }
});

export default router;