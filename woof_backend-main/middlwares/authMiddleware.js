const jwt = require("jsonwebtoken");
const JWT_SECRET = "your_jwt_secret_key"; // same as in controller

const auth = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ message: "No token. Access denied." });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;
