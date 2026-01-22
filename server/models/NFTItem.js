const mongoose = require("mongoose");

const NFTSchema = new mongoose.Schema({
  name: String,
  manufactureDate: String,
  expiryDate: String,
  certificateUrl: String,
  imageUrl: String,
  mintAddress: String,
});

module.exports = mongoose.model("NFTItem", NFTSchema);
