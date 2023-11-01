import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDatabase from "./database/db.js";
import userRoute from "./routes/userRoute.js";

dotenv.config();
const app = express();
connectDatabase();

app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
const corsConfig = {
	credentials: true,
	origin: `${process.env.CLIENT_URL}`,
};
app.use(cors(corsConfig));

app.use("/", userRoute);

app.get("/", (req, res) => {
	res.send("Server is working");
});

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
