const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      "secret_key",
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });

    res.status(200).json({ message: "login successful" });
  } catch (error) {
    console.error("Error in login API:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default login;
