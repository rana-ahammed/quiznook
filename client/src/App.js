import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";

function App() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<>
			<Toaster />
			<Header />
			<Outlet />
			<Footer />
		</>
	);
}

export default App;
