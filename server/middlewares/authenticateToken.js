import jwt from "jsonwebtoken";

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const token = req.cookies.access_token;

  if (!token) {
    return res.status(401).json({ message: "Login first to view the page" });
  }

  // decode the token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = decoded;
  next();
}
export default authenticateToken;
