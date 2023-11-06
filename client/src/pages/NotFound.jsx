import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
	return (
		<section className="flex justify-center items-center min-h-[calc(100vh-72px)] bg-white dark:bg-slate-800">
			<div className="flex flex-col justify-center items-center">
				<h1 className="text-2xl text-black dark:text-white font-bold font-sans">
					It's seems to be you are lost
				</h1>
				<Link
					className="bg-sky-500 py-2 px-4 rounded-lg mt-4 font-semibold font-sans text-white"
					to="/home"
				>
					Back to Home Page
				</Link>
			</div>
		</section>
	);
}

export default NotFound;
