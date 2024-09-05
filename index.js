const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const ShortUrl = require("./model/shortUrl");
const app = express();
app.use(cors());
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index");
});
app.post("/shortUrls", (req, res) => {});
const port = process.env.PORT;
const URI = process.env.MONGODB_URI || "mongodb://localhost:27017/urlShortener";

mongoose
  .connect(URI, {
    // serverSelectionTimeoutMS: 3000000,
  })
  .then(() => {
    console.log("Connected to the database");
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Connection failed");
    console.error("Connection failed", error);
  });

// app.listen(port, () => {
//   console.log(`server runing on port ${port}`);
// });
