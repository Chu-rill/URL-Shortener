const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
const ShortUrl = require("./model/shortUrl");
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.set("view engine", "ejs");
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

app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index", { shortUrls: shortUrls });
});
app.post("/shortUrls", async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl });
  res.redirect("/");
});
app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);
  shortUrl.clicks++;
  shortUrl.save();
  res.redirect(shortUrl.full);
});
