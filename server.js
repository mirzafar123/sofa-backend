// index.js
const express = require("express");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(express.json());
app.use('/api/products', productRoutes); // ✅ bu yerda productRoutes function bo'lishi kerak

app.use("/uploads", express.static("uploads"));


app.listen(process.env.PORT || 3000, () => {
  console.log(
    `Server http://localhost:${process.env.PORT || 3000} da ishga tushdi`
  );
});
