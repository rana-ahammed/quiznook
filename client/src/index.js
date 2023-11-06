import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route path="/" element={<Home />} />
			<Route path="/home" element={!document.cookie && <Home />} />
			<Route
				path="/signup"
				element={document.cookie ? <Home /> : <Signup />}
			/>
			<Route
				path="/login"
				element={document.cookie ? <Home /> : <Login />}
			/>
			<Route path="/quiz" element={<Quiz />} />
			<Route path="*" element={<NotFound />} />
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById("root")).render(
	<RouterProvider router={router} />
);
