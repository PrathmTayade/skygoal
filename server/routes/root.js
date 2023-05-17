import express from "express";
import { signUp } from "../controllers/signup.js";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import { getUserData } from "../controllers/getUserData.js";
import { logout } from "../controllers/logout.js";
import { login } from "../controllers/login.js";
const router = express.Router();

// login
router.get("/", (req, res) => {
  res.send("App is working");
});

router.get("/login", (req, res) => {
  res.send({ hello: "world" });
});

router.post("/login", login);

// signup
router.post("/signup", signUp);

// logout
router.get("/logout", logout);

// private page
router.get("/protected", authenticateToken, getUserData);

export { router as rootRouter };
