const express = require("express");
const router = express.Router();

const ResignationLettersController = require("../controllers/resignationLetters");

router.get("/", ResignationLettersController.Index);
router.post("/", ResignationLettersController.Create);

module.exports = router;