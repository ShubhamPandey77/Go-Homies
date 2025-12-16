const {
  getTripPlanningAssistant,
  getBudgetOptimization,
  generateTravelInsights,
} = require("../Service/aiService");
const Post = require("../models/post");
const Vlog = require("../models/vlog");

exports.tripPlanningChat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    const response = await getTripPlanningAssistant(message);

    res.status(200).json({
      success: true,
      message: "Trip planning advice generated",
      data: {
        response: response,
      },
    });
  } catch (error) {
    console.error("Trip Planning Chat Error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Error in trip planning assistant",
      error: error.message,
    });
  }
};

exports.optimizeBudget = async (req, res) => {
  try {
    const { budget } = req.body;

    if (!budget) {
      return res.status(400).json({
        success: false,
        message: "Budget is required",
      });
    }

    const posts = await Post.find();
    const optimization = await getBudgetOptimization(posts, budget);

    res.status(200).json({
      success: true,
      message: "Budget optimization generated",
      data: {
        response: optimization,
      },
    });
  } catch (error) {
    console.error("Budget Optimization Error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Error in budget optimization",
      error: error.message,
    });
  }
};

exports.getTravelInsights = async (req, res) => {
  try {
    const posts = await Post.find();
    const vlogs = await Vlog.find();

    const insights = await generateTravelInsights(posts, vlogs);

    res.status(200).json({
      success: true,
      message: "Travel insights generated",
      data: {
        response: insights,
        stats: {
          totalPosts: posts.length,
          totalVlogs: vlogs.length,
          avgBudget:
            posts.length > 0
              ? (posts.reduce((sum, p) => sum + p.BudgetPerPerson, 0) /
                  posts.length).toFixed(2)
              : 0,
        },
      },
    });
  } catch (error) {
    console.error("Travel Insights Error:", error.message);
    res.status(500).json({
      success: false,
      message: error.message || "Error in travel insights",
      error: error.message,
    });
  }
};
