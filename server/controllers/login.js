import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const login = async (req, res) => {
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
};

export default login;
