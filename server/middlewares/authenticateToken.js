import jwt, { JsonWebTokenError } from "jsonwebtoken";

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  JsonWebTokenError.verify(token, "secret_key", (error, decodedToken) => {
    if (error) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Attach the decoded token to the request object
    req.user = decodedToken;

    next();
  });
}
export default authenticateToken;
