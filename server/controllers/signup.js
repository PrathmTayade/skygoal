import bcrypt from "bcrypt";
import User from "../models/user.js";

const signUp = async (req, res) => {
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
};

export default signUp;
