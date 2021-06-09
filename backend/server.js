import express from "express";
import cors from "cors";
import words from './api/word.route.js'

const app = express();
app.use(cors());

app.use("/api/words", words)
app.use("*", (req, res) => res.status(404).json({error: "Not found"}))

export default app;