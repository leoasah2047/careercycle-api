const express = require("express");
const router = express.Router();

const OpenaiController = require("../controllers/openaiController");

router.post("/interviewQuestions", OpenaiController.GenerateQuestions);
router.post("/interviewFeedback", OpenaiController.GenerateFeedback);
router.post("/coverLetter", OpenaiController.GenerateCoverLetter);
router.post("/resignationLetter", OpenaiController.GenerateResignationLetter);
router.post("/audioInterview", OpenaiController.GenerateAudioInterview);
router.post("/audioRating", OpenaiController.GenerateAudioRating);
router.post("/resumeRating", OpenaiController.GenerateResumeAnalysis);

module.exports = router;