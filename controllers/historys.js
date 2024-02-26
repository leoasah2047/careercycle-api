const User = require("../models/user");
const History = require('../models/history')
const TokenGenerator = require("../models/token_generator");

const HistoryController = {

  Index: async (req, res) => {
    const user = await User.findById(req.user_id);

    History.find()
      .populate({
        path: "user",
        select: "firstName",
      })
      .exec(async (err, historys) => {
        // if (err) {
        //   throw err;
        // }
        const token = await TokenGenerator.jsonwebtoken(req.user_id);
        res.locals.user_id = req.user_id;
        res
          .status(200)
          .json({ historys: historys, user: user, token: token });
      });
  },

}

module.exports = HistoryController;