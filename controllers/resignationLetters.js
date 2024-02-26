const Users = require("../models/user");
const ResignationLetter = require('../models/resignationLetter');
const TokenGenerator = require("../models/token_generator");

const ResignationLettersController = {
  Index: async (req, res) => {
    const user = await Users.findById(req.user_id) 

    ResignationLetter.find()
      .populate({
        path: "user",
        select: "email",
      })
      .exec(async (err, resignationLetters) => {
        if (err) {
          throw err;
        }
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.locals.user_id = req.user_id;
        res
          .status(200)
          .json({ resignationLetters: resignationLetters, user: user, token: token });
      });
  },

  Create: (req, res) => {
    let ResignationLetterContent = { ...req.body, user: req.user_id };
    const resignationLetter = new ResignationLetter(ResignationLetterContent);
    resignationLetter.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id);
      res.status(201).json({ message: "OK", token: token });
    });
  },
};

module.exports = ResignationLettersController;
