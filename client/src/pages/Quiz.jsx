import { useState, useEffect } from "react";
import { LuAlarmClock } from "react-icons/lu";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
	const navigate = useNavigate();
	const [questions, setQuestions] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);

	const nextButtonHandleClick = () => {
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowScore(true);
		}
	};

	const answerButtonHandleClick = (answerOption) => {
		if (answerOption.isCorrect) {
			setScore(score + 1);
		}
	};

	// Adding Timer
	const [counter, setCounter] = useState(100);
	isLoading === false &&
		counter > 0 &&
		setTimeout(() => setCounter(counter - 1), 1000);

	useEffect(() => {
		axios.defaults.withCredentials = true;

		const getQuestions = async () => {
			await axios
				.get(`${process.env.REACT_APP_SERVER_URL}/quiz`)
				.then((res) => {
					setQuestions(res.data.questions[0].quizData);
					setIsLoading(false);
				})
				.catch((error) => {
					toast.error(error.response.data.message);
					navigate("/login");
					console.clear();
				});
		};
		getQuestions();
	}, [navigate]);

	return (
		<section className="min-h-[calc(100vh-72px)] bg-white dark:bg-gray-800">
			<h1 className="text-3xl font-bold text-center text-black dark:text-white pt-10">
				React Quiz
			</h1>
			<div
				className={`${
					isLoading
						? "hidden"
						: "flex justify-center items-center mt-10"
				}`}
			>
				{showScore || counter === 0 ? (
					<div className="flex flex-col justify-center items-center sm:p-2">
						<h1 className="text-3xl sm:text-xl font-bold font-sans text-gray-800 dark:text-white">
							You scored {score} out of {questions.length}
						</h1>
						<button
							onClick={() => window.location.reload()}
							className="bg-sky-500 px-4 py-2 rounded-lg mt-4 text-lg font-semibold"
						>
							Back to the quiz again
						</button>
					</div>
				) : (
					<div className="flex flex-col bg-gray-100 dark:bg-slate-700 min-w-sm p-4 rounded-lg z-40">
						<h1 className="text-2xl font-bold font-sans text-gray-700 dark:text-white">
							{questions[currentQuestion]?.questionText}
						</h1>
						<div className="text-xl font-semibold text-gray-500 flex flex-col mt-8 gap-2">
							{questions[currentQuestion]?.answerOptions.map(
								(answerOption, index) => (
									<button
										onClick={() =>
											answerButtonHandleClick(
												answerOption
											)
										}
										key={index}
										className="text-left bg-gray-200 p-2 rounded-lg hover:bg-sky-500 hover:text-white focus:bg-orange-500 focus:text-white dark:bg-slate-600 dark:hover:bg-sky-500 dark:text-gray-200 dark:focus:bg-orange-500"
									>
										{answerOption.answerText}
									</button>
								)
							)}
							<div className={"flex justify-between mt-2"}>
								<button className="bg-gray-400 dark:bg-slate-800 text-white py-2 px-4 rounded-lg w-20 gap-1 flex items-center">
									<LuAlarmClock />
									{counter}
								</button>
								<button
									onClick={nextButtonHandleClick}
									className="bg-sky-500 font-sans p-2 rounded-lg text-white w-20"
								>
									Next
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
			)
		</section>
	);
};

export default Quiz;
