const getUserData = (req, res) => {
  // User details can be accessed from req.user
  res.status(200).json({ userId: req.user.userId, email: req.user.email });
};
export { getUserData };
