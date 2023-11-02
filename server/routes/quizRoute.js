import express from "express";
import { setQuiz, getQuiz } from "../controllers/quizController.js";

const router = express.Router();

router.post("/quiz", setQuiz);
router.get("/quiz", getQuiz);

export default router;
