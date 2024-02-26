const mongoose = require('mongoose')

const User = require("./user");
const { ObjectID } = require("mongodb");

const HistorySchema = new mongoose.Schema({
  body: { type: String },
  userID: { type: String },
  type: { type: String },  
  date: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

const History = mongoose.model("History", HistorySchema);

module.exports = History;