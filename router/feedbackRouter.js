const express = require("express");
const router = express.Router();

const feedbackController = require("../controllers/feedbackController");

// ROUTES
router.get("/list-feed", feedbackController.getHome);

router.get("/feedback", feedbackController.getAddFeedBack);

router.post("/feedback", feedbackController.postFeedBack);

router.get("/delete/:id", feedbackController.deleteFeedBack);

module.exports = router;
