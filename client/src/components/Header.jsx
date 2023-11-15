import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import toast from "react-hot-toast";

const Header = () => {
	const navigate = useNavigate();
	const [isDark, setIsDark] = useState(true);
	const [isNavOpen, setIsNavOpen] = useState(false);

	function setDark() {
		document.documentElement.classList.add("dark");
		document.documentElement.classList.remove("light");
		localStorage.setItem("theme", "dark");
		setIsDark(true);
	}

	function setLight() {
		document.documentElement.classList.add("light");
		document.documentElement.classList.remove("dark");
		localStorage.removeItem("theme");
		setIsDark(false);
	}

	function toggleMode() {
		if (isDark) {
			setLight();
		} else {
			setDark();
		}
	}

	// When the page is loaded or refreshed, check for theme preference
	useEffect(() => {
		if (localStorage.getItem("theme") === "dark") {
			setDark();
		} else {
			setLight();
		}
	}, []);
	const loggedIn = localStorage.getItem("isLoggedIn");

	const handleLogout = () => {
		const config = {
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
		};

		axios
			.get(`${process.env.REACT_APP_SERVER_URL}/logout`, config)
			.then((res) => {
				toast.success(res.data.message);
				localStorage.removeItem("isLoggedIn");
				navigate("/home");
			})
			.catch((error) => toast.error(error.response.data.message));
	};
	return (
		<>
			<header className="bg-white dark:bg-gray-800 z-50 sticky top-0 shadow-lg">
				<nav className="max-w-6xl mx-auto flex justify-between items-center p-4">
					<NavLink
						to="/"
						className={({ isActive }) =>
							isActive ? "flex gap-2 text-sky-500" : "flex gap-2"
						}
					>
						<img className="w-10 h-10" src={logo} alt="logo" />
						<button className="text-3xl font-extrabold font-sans hover:text-sky-500 dark:text-white dark:hover:text-sky-500">
							QUIZO
						</button>
					</NavLink>

					{/* Above Medium Screens */}
					<div className="md:flex gap-6 text-md lg:text-xl hidden md:items-center font-semibold dark:text-white">
						<NavLink
							to="/home"
							className={({ isActive }) =>
								isActive
									? "text-sky-500"
									: "dark:text-white hover:text-sky-500"
							}
						>
							Home
						</NavLink>
						<NavLink
							to="/quiz"
							className={({ isActive }) =>
								isActive
									? "text-sky-500"
									: "dark:text-white  hover:text-sky-500"
							}
						>
							Quiz
						</NavLink>
						{loggedIn && (
							<button
								onClick={handleLogout}
								className="dark:text-white hover:text-sky-500"
							>
								Logout
							</button>
						)}
						{!loggedIn && (
							<NavLink
								to="/login"
								className={({ isActive }) =>
									isActive
										? "text-sky-500"
										: "dark:text-white hover:text-sky-500"
								}
							>
								Login
							</NavLink>
						)}
						{!loggedIn && (
							<NavLink
								to="/signup"
								className={({ isActive }) =>
									isActive
										? "text-black bg-sky-700 p-2 rounded-lg"
										: "dark:text-white text-black bg-sky-700 p-2 rounded-lg"
								}
							>
								Sign up
							</NavLink>
						)}
						<button onClick={toggleMode} className="outline-none">
							{isDark ? (
								<HiOutlineSun className="hover:text-sky-500" />
							) : (
								<HiOutlineMoon className="hover:text-sky-500" />
							)}
						</button>
					</div>

					{/* Below Medium Screens */}

					<button
						onClick={() => setIsNavOpen((prev) => !prev)}
						className="md:hidden outline-none border-none"
						aria-label="hamburger-menu"
					>
						{isNavOpen ? (
							<RxCross2 className="w-8 h-8 dark:text-white hover:text-sky-400 dark:hover:text-sky-400" />
						) : (
							<GiHamburgerMenu className="w-8 h-8 dark:text-white hover:text-sky-400 dark:hover:text-sky-400" />
						)}
					</button>
				</nav>
			</header>
			<div
				className={`${
					isNavOpen ? "flex" : "hidden"
				} w-full flex flex-col gap-4 font-bold items-center text-xl p-4 md:hidden sticky top-[72px] bg-gray-100 dark:bg-gray-800 mx-auto z-50`}
			>
				<NavLink
					onClick={() => setIsNavOpen(false)}
					to="/home"
					className={({ isActive }) =>
						isActive
							? "bg-sky-600 text-white p-2 rounded-lg"
							: "bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-700 text-black dark:text-white p-2 rounded-lg"
					}
				>
					Home
				</NavLink>
				<NavLink
					onClick={() => setIsNavOpen(false)}
					to="/quiz"
					className={({ isActive }) =>
						isActive
							? "bg-sky-600 text-white p-2 rounded-lg"
							: "bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-700 text-black dark:text-white p-2 rounded-lg"
					}
				>
					Quiz
				</NavLink>
				{loggedIn && (
					<div onClick={() => setIsNavOpen(false)}>
						<button
							onClick={handleLogout}
							className="bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-700 text-black dark:text-white p-2 rounded-lg"
						>
							Logout
						</button>
					</div>
				)}
				{!loggedIn && (
					<NavLink
						onClick={() => setIsNavOpen(false)}
						to="/login"
						className={({ isActive }) =>
							isActive
								? "bg-sky-600 text-white p-2 rounded-lg"
								: "bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-700 text-black dark:text-white p-2 rounded-lg"
						}
					>
						Login
					</NavLink>
				)}
				{!loggedIn && (
					<NavLink
						onClick={() => setIsNavOpen(false)}
						to="/signup"
						className={({ isActive }) =>
							isActive
								? "bg-sky-600 text-black p-2 rounded-lg"
								: "bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-700 text-black dark:text-white p-2 rounded-lg"
						}
					>
						Sign up
					</NavLink>
				)}
				<button
					onClick={toggleMode}
					className="bg-gray-200 dark:bg-slate-600 hover:bg-gray-300 dark:hover:bg-slate-700 text-black dark:text-white p-2 rounded-lg outline-none border-none"
				>
					{isDark ? <HiOutlineSun /> : <HiOutlineMoon />}
				</button>
			</div>
		</>
	);
};

export default Header;
