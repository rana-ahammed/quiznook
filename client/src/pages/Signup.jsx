import { useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		await axios
			.post(
				`${process.env.REACT_APP_SERVER_URL}/signup`,
				{ username, email, password },
				{ "Content-Type": "multipart/form-data", withCredentials: true }
			)
			.then((res) => {
				toast.success(res.data.message);
				setUsername("");
				setEmail("");
				setPassword("");
			})
			.catch((error) => toast.error(error.response.data.message));
	};

	return (
		<section className="bg-white dark:bg-gray-800 min-h-[calc(100vh-72px)] w-full flex justify-center items-center">
			<form
				className="w-full h-3/4 max-w-sm bg-gray-100 dark:bg-slate-700 gap-4 p-4 flex flex-col rounded-md z-10"
				onSubmit={handleSubmit}
				autoComplete="off"
			>
				<img src={logo} alt="logo" className="w-10 h-10 mx-auto" />
				<h1 className="text-2xl text-center font-bold text-gray-600 dark:text-white">
					Sign up
				</h1>
				<div className="flex flex-col">
					<label
						htmlFor="username"
						className="text-lg font-semibold text-gray-700 dark:text-white font-sans"
					>
						Username
					</label>
					<input
						type="text"
						id="username"
						className="bg-gray-200 dark:border-none dark:bg-slate-600 rounded-lg p-2 focus:outline-none border-2 focus:border-sky-400 text-lg font-semibold text-gray-800 dark:text-gray-200"
						onChange={(e) => setUsername(e.target.value)}
						value={username}
					/>
				</div>
				<div className="flex flex-col">
					<label
						htmlFor="email"
						className="text-lg font-semibold text-gray-700 dark:text-white font-sans"
					>
						Email
					</label>
					<input
						type="email"
						id="email"
						className="bg-gray-200 dark:bg-slate-600 dark:border-none rounded-lg p-2 focus:outline-none border-2 focus:border-sky-500 text-lg font-semibold text-gray-800 dark:text-gray-200"
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
				</div>
				<div className="flex flex-col">
					<label
						htmlFor="password"
						className="text-lg font-semibold text-gray-700 font-sans dark:text-white"
					>
						Password
					</label>
					<input
						type="password"
						id="password"
						className="bg-gray-200 dark:bg-slate-600 dark:border-none rounded-lg p-2 focus:outline-none border-2 focus:border-sky-400 text-lg font-semibold text-gray-800 dark:text-gray-200"
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</div>
				<button className="bg-sky-500 hover:bg-sky-400 p-2 mt-4 text-white text-xl font-semibold font-sans rounded-lg">
					Create Account
				</button>
				<Link
					to="/login"
					className="text-md font-normal text-gray-400 dark:text-gray-200 dark:hover:text-white text-center"
				>
					Already have an account?{" "}
					<span className="font-semibold text-md text-sky-500 dark:hover:text-sky-400">
						Login
					</span>
				</Link>
			</form>
		</section>
	);
};

export default Signup;
