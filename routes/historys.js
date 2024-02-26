const express = require("express");
const router = express.Router();
const HistoryController = require('../controllers/historys')

router.get("/", HistoryController.Index);

module.exports = router;