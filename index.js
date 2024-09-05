const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
app.use(cors());
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index");
});

const port = process.env.PORT;
// const URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/e-commerce";

app.listen(port, () => {
  console.log(`server runing on port ${port}`);
});
