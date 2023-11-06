import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
	try {
		const { jwtToken } = req.cookies;
		console.log(jwtToken, "jwtToken, isAuthenticated");
		if (!jwtToken)
			return res
				.status(401)
				.json({ message: "Please Login First to Attend Quiz" });

		const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
		req.user = await User.findById({ _id: decoded._id });
		next();
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export default isAuthenticated;
