// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token yo‘q" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Token noto‘g‘ri" });
    req.user = user;
    next();
  });
}

function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.sendStatus(403); // Forbidden
    }
    next();
  };
}

// 👇 IKKALASINI EKSPORT QILISH MUHIM
module.exports = {
  authenticateToken,
  authorizeRole,
};
