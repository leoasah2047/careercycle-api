const express = require("express");
const router = express.Router();
const PostController = require('../controllers/posts')

router.post("/create", PostController.Create);
router.put("/:id", PostController.Update);
router.delete("/:id", PostController.Delete);
router.get("/", PostController.Index);
router.get("/:id", PostController.GetPostDetails);

module.exports = router;