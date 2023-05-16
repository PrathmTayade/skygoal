import express, { json } from "express";
import cors from "cors";
import rootRouter from "./routes/root.js";
import * as dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.send("hellow");
});

app.use("/", rootRouter);

//connect to mongodb
connectDB();

app.listen(process.env.PORT, () => {
  console.log("Server started on 5000");
});
