// middleware/adminMiddleware.js
function requireAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin ruxsati kerak" });
  }
  next();
}

module.exports = requireAdmin;

