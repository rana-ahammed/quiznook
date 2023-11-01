import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		if (!username)
			return res
				.status(400)
				.json({ message: "Please enter your username" });
		if (!email)
			return res.status(400).json({ message: "Please enter your email" });
		if (!password)
			return res
				.status(400)
				.json({ message: "Please enter your password" });

		const user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ message: "User already exists." });
		} else {
			const saltRounds = process.env.SALTROUNDS;
			const salt = bcrypt.genSaltSync(Number(saltRounds));
			const hashPassword = bcrypt.hashSync(password, salt);

			const newUser = new User({
				username,
				email,
				password: hashPassword,
			});
			await newUser.save();

			const jwtToken = jwt.sign(
				{ _id: newUser._id.toString() },
				process.env.JWT_SECRET
			);

			const options = {
				expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			};
			return res
				.status(201)
				.cookie("jwtToken", jwtToken, options)
				.json({ message: "You signed up successfully" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email)
			return res.status(400).json({ message: "Please enter your email" });
		if (!password)
			return res
				.status(400)
				.json({ message: "Please enter your password" });
		const user = await User.findOne({ email }).select("+password");
		if (!user)
			return res
				.status(400)
				.json({ message: "Invalid email or password" });

		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword)
			return res
				.status(400)
				.json({ message: "Invalid email or password" });

		const jwtToken = jwt.sign(
			{ _id: user._id.toString() },
			process.env.JWT_SECRET
		);
		const options = {
			expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
			httpOnly: true,
		};
		res.status(200)
			.cookie("jwtToken", jwtToken, options)
			.json({ message: "Log in successful" });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

export const logout = async (req, res) => {
	try {
		const options = { expires: new Date(Date.now()), httpOnly: true };
		res.status(200)
			.cookie("jwtToken", null, options)
			.json({ message: "Logout is successful" });
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};
