

import express, { json } from "express";
import cors from "cors";
import rootRouter from "./routes/root.js"
const app = express();
app.use(cors());
app.use(json());

app.get("/", (req, res) => {
  res.send("hellow");
});

app.use("/" , rootRouter)
app.listen(5000, () => {
  console.log("Server started on 5000");
});
