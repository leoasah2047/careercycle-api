const mongoose = require("mongoose");
const Users = require("./user");
const { ObjectID } = require("mongodb");

const ResignationLetterSchema = new mongoose.Schema({
  company: { type: String },
  jobPosition: { type: String }, 
  content: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

const ResignationLetter = mongoose.model("ResignationLetter", ResignationLetterSchema);

module.exports = ResignationLetter;