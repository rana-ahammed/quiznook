import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import connectDatabase from "./database/db.js";
import userRoute from "./routes/userRoute.js";
import quizRoute from "./routes/quizRoute.js";

dotenv.config();
const app = express();
connectDatabase();

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("tiny"));
const corsConfig = {
	credentials: true,
	origin: `${process.env.CLIENT_URL}`,
	sameSite: none,
};
app.use(cors(corsConfig));

app.use("/", userRoute);
app.use("/", quizRoute);

app.get("/", (req, res) => {
	res.send("Server is working");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
