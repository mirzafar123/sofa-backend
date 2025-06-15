// controllers/productController.js
const pool = require("../config/db");

exports.getAllProducts = async (req, res) => {
  const result = await pool.query("SELECT * FROM products");
  res.json(result.rows);
};

exports.addProduct = async (req, res) => {
  const { name, category, price, description } = req.body;
  const result = await pool.query(
    "INSERT INTO products (name, category, price, description) VALUES ($1, $2, $3, $4) RETURNING *",
    [name, category, price, description]
  );
  res.status(201).json(result.rows[0]);
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, category, price, description } = req.body;
  const result = await pool.query(
    "UPDATE products SET name=$1, category=$2, price=$3, description=$4 WHERE id=$5 RETURNING *",
    [name, category, price, description, id]
  );
  res.json(result.rows[0]);
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM products WHERE id=$1", [id]);
  res.json({ message: "O‘chirildi" });
};
