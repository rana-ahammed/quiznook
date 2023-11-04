import Quiz from "../models/QuizModel.js";
import { quizData } from "../database/quizData.js";
import jwt from "jsonwebtoken";

export const setQuiz = async (req, res) => {
	try {
		await Quiz.insertMany({
			quizData,
		});
		res.status(200).json({
			message: "All questions has created successfully",
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getQuiz = async (req, res) => {
	try {
		const questions = await Quiz.find();
		res.status(200).json({ questions, message: "Successful" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};
