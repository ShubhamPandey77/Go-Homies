const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getTripPlanningAssistant = async (userMessage) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY not configured");
    }

    if (process.env.GEMINI_API_KEY === "your_gemini_api_key_here") {
      throw new Error("GEMINI_API_KEY is not set. Please add your API key to .env file");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemPrompt = `You are a helpful travel planning assistant for GoHomies - a travel social platform. 
    Help users plan their trips by:
    - Suggesting destinations based on their preferences
    - Recommending activities and attractions
    - Providing travel tips and advice
    - Answering questions about travel planning
    Keep responses concise and helpful. Focus on practical travel advice.`;

    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const result = await chat.sendMessage(
      `${systemPrompt}\n\nUser: ${userMessage}`
    );
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Trip Planning Error:", error.message);
    throw new Error(error.message || "Failed to get trip planning advice");
  }
};

const getBudgetOptimization = async (posts, userBudget) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY not configured");
    }

    if (process.env.GEMINI_API_KEY === "your_gemini_api_key_here") {
      throw new Error("GEMINI_API_KEY is not set. Please add your API key to .env file");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const postsData = posts.length > 0
      ? posts
          .map(
            (post) =>
              `Destination: ${post.destination}, Budget per person: $${post.BudgetPerPerson}, Persons: ${post.totalPersons}, Month: ${post.TravelMonth}`
          )
          .join("\n")
      : "No trips available in the system yet";

    const prompt = `Analyze these travel posts and optimize budget recommendations for a user with $${userBudget} budget:
    
    ${postsData}
    
    Provide:
    1. Best value trips for the budget
    2. Money-saving tips
    3. Alternative dates/destinations that might be cheaper
    4. Total cost estimates
    
    Keep response concise and practical.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Budget Optimization Error:", error.message);
    throw new Error(error.message || "Failed to optimize budget");
  }
};

const generateTravelInsights = async (posts, vlogs) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY not configured");
    }

    if (process.env.GEMINI_API_KEY === "your_gemini_api_key_here") {
      throw new Error("GEMINI_API_KEY is not set. Please add your API key to .env file");
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const avgBudget =
      posts.length > 0
        ? (posts.reduce((sum, p) => sum + p.BudgetPerPerson, 0) / posts.length).toFixed(2)
        : 0;

    const destinations = [...new Set(posts.map((p) => p.destination))];
    const months = [...new Set(posts.map((p) => p.TravelMonth))];

    const prompt = `Generate travel insights based on this data:
    
    Total Trips: ${posts.length}
    Total Vlogs: ${vlogs.length}
    Average Budget: $${avgBudget}
    Popular Destinations: ${destinations.join(", ") || "None yet"}
    Popular Months: ${months.join(", ") || "None yet"}
    
    Provide:
    1. Trending destinations
    2. Best time to travel
    3. Budget trends and insights
    4. Community activity analysis
    5. Travel recommendations based on trends
    
    Keep the response informative but concise.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Travel Insights Error:", error.message);
    throw new Error(error.message || "Failed to generate insights");
  }
};

module.exports = {
  getTripPlanningAssistant,
  getBudgetOptimization,
  generateTravelInsights,
};
