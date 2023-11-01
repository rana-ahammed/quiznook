import { useState, useEffect } from "react";
import { LuAlarmClock } from "react-icons/lu";

const Quiz = () => {
	const questions = [
		{
			questionText:
				"1. Which of the following is used in React.js to increase performance?",
			answerOptions: [
				{ answerText: "Virtual DOM", isCorrect: true },
				{ answerText: "Original DOM", isCorrect: false },
				{ answerText: "Both A & B", isCorrect: false },
				{ answerText: "None of the above", isCorrect: false },
			],
		},
		{
			questionText: "2. What is ReactJS?",
			answerOptions: [
				{ answerText: "Server-side framework", isCorrect: false },
				{ answerText: "User interface framework", isCorrect: true },
				{ answerText: "Both A & B", isCorrect: false },
				{ answerText: "None of the Above", isCorrect: false },
			],
		},
		{
			questionText:
				"3. Identify the one which is used to pass data to components from outside",
			answerOptions: [
				{ answerText: "Render with arguments", isCorrect: false },
				{ answerText: "setState", isCorrect: false },
				{ answerText: "propTypes", isCorrect: false },
				{ answerText: "props", isCorrect: true },
			],
		},
		{
			questionText: "4. Who created React.js?",
			answerOptions: [
				{ answerText: "Jordan Mike", isCorrect: false },
				{ answerText: "Jordan Walke", isCorrect: true },
				{ answerText: "Tim Lee", isCorrect: false },
				{ answerText: "Jordan Lee", isCorrect: false },
			],
		},
		{
			questionText: "5. In which language is React.js written?",
			answerOptions: [
				{ answerText: "Python", isCorrect: false },
				{ answerText: "JavaScript", isCorrect: true },
				{ answerText: "Java", isCorrect: false },
				{ answerText: "PHP", isCorrect: false },
			],
		},
		{
			questionText: "6. What is Babel?",
			answerOptions: [
				{ answerText: "JavaScript Compiler", isCorrect: true },
				{ answerText: "JavaScipt Interpreter", isCorrect: false },
				{ answerText: "JavaScript Transpiler", isCorrect: false },
				{ answerText: "None of the Above", isCorrect: false },
			],
		},
		{
			questionText: "7. Identify the command used to create a react app.",
			answerOptions: [
				{
					answerText: "npm install create-react-app",
					isCorrect: false,
				},
				{
					answerText: "npm install -g create-react-app",
					isCorrect: true,
				},
				{ answerText: "install -g create-react-app", isCorrect: false },
				{ answerText: "None of the Above", isCorrect: false },
			],
		},
		{
			questionText:
				"8. Which of the following port is the default where webpack-dev-server runs?",
			answerOptions: [
				{ answerText: "3000", isCorrect: false },
				{ answerText: "3306", isCorrect: false },
				{ answerText: "3030", isCorrect: false },
				{ answerText: "8080", isCorrect: true },
			],
		},
		{
			questionText:
				"9. How many elements can a valid react component return?",
			answerOptions: [
				{ answerText: "1", isCorrect: true },
				{ answerText: "2", isCorrect: false },
				{ answerText: "3", isCorrect: false },
				{ answerText: "4", isCorrect: false },
			],
		},
		{
			questionText: "10. A state in React.js is also known as?",
			answerOptions: [
				{
					answerText: "The internal storage of the component.",
					isCorrect: true,
				},
				{
					answerText: "External storage of the component",
					isCorrect: false,
				},
				{ answerText: "Permanent storage", isCorrect: false },
				{ answerText: "All of the above", isCorrect: false },
			],
		},
	];

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

	useEffect(() => {
		counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
	}, [counter]);

	return (
		<section className="min-h-[calc(100vh-72px)] bg-white dark:bg-gray-800">
			<h1 className="text-3xl font-bold text-center text-black dark:text-white pt-10">
				React Quiz
			</h1>
			<div className="flex justify-center items-center mt-10">
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
							{questions[currentQuestion].questionText}
						</h1>
						<div className="text-xl font-semibold text-gray-500 flex flex-col mt-8 gap-2">
							{questions[currentQuestion].answerOptions.map(
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
							<div className="flex justify-between mt-2">
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
		</section>
	);
};

export default Quiz;
