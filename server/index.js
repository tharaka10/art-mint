const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const NFTItem = require("./models/NFTItem");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/nftgoods");

app.post("/api/nfts", async (req, res) => {
  const item = new NFTItem(req.body);
  await item.save();
  res.send(item);
});

app.get("/api/nfts", async (req, res) => {
  const items = await NFTItem.find();
  res.send(items);
});

app.listen(5000, () => console.log("Backend running on http://localhost:5000"));
