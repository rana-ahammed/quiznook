import express from "express";
import { setQuiz, getQuiz } from "../controllers/quizController.js";
import isAuthenticated from "../middlewares/auth.js";

const router = express.Router();

router
	.route("/quiz")
	.post(isAuthenticated, setQuiz)
	.get(isAuthenticated, getQuiz);

export default router;
