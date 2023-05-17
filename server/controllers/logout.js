const logout = async(req, res) => {
  res
    .status(200)
    .cookie("access_token", "", {
      expires: new Date(Date.now()),
    })
    .json({ message: "User Logged out" });
};

export default logout;
