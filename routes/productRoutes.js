const express = require("express");
const router = express.Router();
const db = require("../config/db.js");
const upload = require("../middleware/upload");
const { authenticateToken, authorizeRole } = require("../middleware/authMiddleware.js");

const {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");


const requireAdmin = require("../middleware/adminMiddleware");

router.get("/", getAllProducts);
router.post(
  "/",
  authenticateToken,
  authorizeRole("admin"),
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, category, price, description } = req.body;
      const imageUrl = req.file ? req.file.filename : null;

      const result = await db.query(
        "INSERT INTO products (name, category, price, description, image) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, category, price, description, imageUrl]
      );

      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server xatosi" });
    }
  }
);
router.put("/:id", authenticateToken, requireAdmin, updateProduct);
router.delete("/:id", authenticateToken, requireAdmin, deleteProduct);

module.exports = router; // ✅ EKSport qilish shart!