import express from "express";
import login from "../controllers/login.js";

const router = express.Router();

router.post("/login", login);
router.get("/login", (req, res) => {
  res.send("login");
});
router.post("/logout");

export default router;
