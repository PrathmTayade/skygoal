import express from "express";
import { authenticateToken } from "../middlewares/authenticateToken.js";
import { getUserData } from "../controllers/getUserData.js";
import { logout } from "../controllers/logout.js";

// testing 6
import bcrypt from "bcryptjs";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// login
router.get("/", (req, res) => {
  res.send("App is working");
});

router.get("/login", (req, res) => {
  res.send({ hello: "world" });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // console.log(req.body);

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found, please signup first" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Please check your email or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "6h" }
    );

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true, maxAge: 15 * 60 * 1000 })
      .json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error in login API:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// signup
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log(req.body);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Error in signup API:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// logout
router.get("/logout", logout);

// private page
router.get("/protected", authenticateToken, getUserData);

export { router as rootRouter };
