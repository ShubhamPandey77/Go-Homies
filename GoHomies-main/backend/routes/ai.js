const express = require("express");
const {
  tripPlanningChat,
  optimizeBudget,
  getTravelInsights,
} = require("../controllers/aiController");

const router = express.Router();

router.post("/trip-planning", tripPlanningChat);
router.post("/optimize-budget", optimizeBudget);
router.get("/travel-insights", getTravelInsights);

module.exports = router;
