import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const config = {
		withCredentials: true,
		headers: { "Content-Type": "application/json" },
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await axios
			.post(
				`${process.env.REACT_APP_SERVER_URL}/login`,
				{ email, password },
				config
			)
			.then((res) => {
				toast.success(res.data.message);
				navigate("/quiz");
				localStorage.setItem("isLoggedIn", true);
				setEmail("");
				setPassword("");
			})
			.catch((error) => toast.error(error.response.data.message));
	};

	return (
		<section className="bg-white dark:bg-gray-800 w-full min-h-[calc(100vh-72px)] flex justify-center items-center">
			<form
				onSubmit={handleSubmit}
				className="max-w-sm w-full h-3/4 bg-gray-100 dark:bg-slate-700 flex flex-col gap-4 p-4 rounded-md"
			>
				<img src={logo} alt="logo" className="w-10 h-10 mx-auto" />
				<h1 className="text-2xl font-bold text-center text-gray-600 dark:text-white">
					Log in
				</h1>
				<div className="flex flex-col mt-4">
					<label
						htmlFor="email"
						className="text-lg font-sans font-semibold text-gray-500 dark:text-white"
					>
						Email
					</label>
					<input
						type="email"
						name="email"
						id="email"
						autoComplete="off"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						className="bg-gray-200 dark:bg-slate-600 dark:border-none rounded-lg p-2 focus:outline-none border-2 focus:border-sky-400 text-lg font-semibold text-gray-800 dark:text-gray-200"
					/>
				</div>
				<div className="flex flex-col">
					<label
						htmlFor="password"
						className="text-lg font-sans font-semibold text-gray-500 dark:text-white"
					>
						Password
					</label>
					<input
						type="password"
						name="password"
						id="password"
						autoComplete="off"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						className="bg-gray-200 dark:bg-slate-600 dark:border-none rounded-lg p-2 focus:outline-none border-2 focus:border-sky-400 text-lg font-semibold text-gray-800 dark:text-gray-200"
					/>
				</div>
				<button className="bg-sky-400 hover:bg-sky-500 p-2 rounded-lg text-black font-bold text-xl mt-2">
					Log in
				</button>
				<Link
					to="/signup"
					className="text-center font-semibold text-md mt-1 dark:text-white dark:hover:text-gray-200"
				>
					Don&apos;t have an account?{" "}
					<span className="text-sky-500 font-bold ml-1 hover:text-sky-400">
						Sign up
					</span>
				</Link>
			</form>
		</section>
	);
};

export default Login;
