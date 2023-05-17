import express from "express";
import login from "../controllers/login.js";
import signUp from "../controllers/signup.js";
import authenticateToken from "../middlewares/authenticateToken.js";
import getUserData from "../controllers/getUserData.js";
import logout from "../controllers/logout.js";

const router = express.Router();

// login
router.get("/login", (req, res) => {
  res.send("hello world");
});
router.post("/login", login);

// signup
router.post("/signup", signUp);

// logout
router.get("/logout", logout);

// private page
router.get("/protected", authenticateToken, getUserData);
export default router;
