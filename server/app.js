import express, { json } from "express";
import cors from "cors";
import rootRouter from "./routes/root.js";
import * as dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";

const app = express();

// Middlewares
app.use(express.json());
dotenv.config();
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

// Routes
app.use("/", rootRouter);

// Connect to Database
connectDB();

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.PORT}`);
});
