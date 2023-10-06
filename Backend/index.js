import express from 'express';
import cors from 'cors';
import upload from "./routes/upload.js";
import auth from "./routes/auth.js";
import { port } from "./utility/utility.js";
import { fileURLToPath } from 'url';
import path from 'path';
import dbConnect from './utility/dbConnect.js';
import user from "./routes/user.js";
import download from "./routes/download.js";
import edit from "./routes/edit.js";
import Delete from "./routes/delete.js";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(`${__dirname}/images`));

app.use("/upload", upload);
app.use("/auth", auth);
app.use("/user", user);
app.use("/download", download);
app.use("/edit", edit);
app.use("/delete", Delete);


app.listen(port, () => {
  dbConnect();
})

