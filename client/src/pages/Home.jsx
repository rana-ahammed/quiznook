import { Link } from "react-router-dom";
import homevideo from "../assets/quiz-video-home-page.mp4";

const Home = () => {
	return (
		<>
			<div className="min-h-[calc(100vh-70px)] w-full z-20 dark:hero-bg-none dark:bg-gray-800">
				<div className="mx-auto flex flex-col lg:flex-row md:justify-between w-full md:w-3/4 p-4 lg:gap-10">
					<div className="order-2 lg:order-1 text-center md:-mt-12 lg:mt-24 xl:mt-32 font-bold mt-8">
						<p className="text-4xl lg:text-5xl lg:text-center dark:text-white">
							Test Your{" "}
							<span className="text-sky-500">Knowledge</span>
							<br />{" "}
							<span className="text-red-500">
								Welcome to the
							</span>{" "}
							<span className="text-black text-5xl font-extrabold font-sans dark:text-white">
								QUIZO!
							</span>{" "}
						</p>
						<p className="font-semibold text-lg md:text-2xl mt-8 text-gray-500 lg:text-center dark:text-gray-200">
							Join the Quizo community and embark
						</p>
						<p className="font-semibold text-lg md:text-2xl mb-4 md:mb-8 text-gray-500 lg:text-center dark:text-gray-200">
							{" "}
							on a journey of learning and fun.
						</p>
						<Link
							to="/quiz"
							className="bg-sky-600 hover:bg-sky-700 px-4 md:px-24 py-2 rounded-lg text-white font-bold text-lg md:text-xl mb-4 lg:text-center xl:text-2xl min-[320px]:-mb-20"
						>
							Test Your Skill
						</Link>
					</div>
					<div className="order-1 lg:order-2 mt-4 md:mt-4 md:mb-20 mx-auto lg:mt-40 xl:mt-38">
						<video
							width="400"
							loop
							autoPlay=" "
							muted
							className="rounded-lg"
						>
							<source src={homevideo} type="video/mp4" />
							<track
								src="captions_en.vtt"
								kind="captions"
								srclang="en"
								label="english_captions"
							/>
						</video>
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
