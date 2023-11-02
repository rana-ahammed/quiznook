import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
	quizData: { type: Array, default: [] },
});

const Quiz = mongoose.model("Quizes", quizSchema);
export default Quiz;
