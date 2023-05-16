import express from "express";
import login from "../controllers/login.js";
import signUp from "../controllers/signup.js";

const router = express.Router();

// login
router.get("/login" , (req, res) =>{
    res.send("gello")
})
router.post("/login", login);

// signup
router.post("/signup", signUp);

// logout
router.post("/logout");

export default router;
