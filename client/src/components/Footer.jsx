import { Link } from "react-router-dom";
import { MdEmail } from "react-icons/md";
import { BsTwitter } from "react-icons/bs";
import { FaGithubSquare } from "react-icons/fa";

const Footer = () => {
	return (
		<div className="bg-gray-100 dark:bg-slate-800 p-6 shadow-lg dark:text-white">
			<p className="font-sans font-bold text-sm md:text-2xl text-center mb-1">
				All Rights Reserved By @Quizo
			</p>
			<div className="flex gap-10 justify-center text-xl mt-4">
				<Link to="mailto:business.ranaahammed@gmail.com">
					<MdEmail className="hover:scale-150" />
				</Link>
				<Link to="https://twitter.com/rana_ahammed_">
					<BsTwitter className="hover:scale-150" />
				</Link>
				<Link to="https://github.com/rana-ahammed">
					<FaGithubSquare className="hover:scale-150" />
				</Link>
			</div>
		</div>
	);
};

export default Footer;
