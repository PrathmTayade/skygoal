import express, { json } from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import cookieParser from "cookie-parser";
import { serverless } from "serverless-http";
import rootRouter from "../routes/root.js";

const app = express();
// Middlewares
app.use(express.json());
dotenv.config();
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true,
  })
);
app.use(cookieParser());

// Routes
app.use("/.netlify/functions/api", rootRouter);
// Connect to Database
connectDB();

// Start Server
app.listen(process.env.PORT, () => {
  console.log(`Server started on ${process.env.PORT}`);
});

const handler = serverless(app);

export default handler;
