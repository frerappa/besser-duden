import express from "express";
import WordsController from './words.controller.js';

const router = express.Router();

router.route("/").get(WordsController.getWord);

export default router;