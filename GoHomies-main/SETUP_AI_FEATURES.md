# AI Features Setup Guide

This guide will help you set up and configure the three new AI features integrated into GoHomies.

## 🎯 Features Added

1. **Trip Planning Assistant** - Interactive chatbot for travel advice
2. **Budget Optimizer** - AI-powered budget optimization for trips
3. **Travel Insights** - Community data analysis and trends

## 📋 Prerequisites

- Node.js and npm installed
- MongoDB database (already configured)
- Google Gemini API key (free)

## 🔑 Step 1: Get Gemini API Key (FREE)

### Option A: Get Free Gemini API Key

1. Visit https://aistudio.google.com/
2. Click "Get API Key"
3. Create a new project or select existing
4. Click "Create API Key in new Google Cloud project"
5. Copy your API key

### Gemini API Free Tier Includes:
- 60 requests per minute
- Up to 2 million tokens per month
- Perfect for development and testing

## 🛠️ Step 2: Configure Backend

### Update .env file

1. Navigate to `backend/` folder
2. Open `.env` file
3. Update the Gemini API key:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=gohomies_jwt_secret_key_2024
PORT=8001
GEMINI_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual Gemini API key from Step 1.

## 🚀 Step 3: Start the Application

### Backend Setup

```bash
cd backend
npm install
npm start
```

The backend will start at `http://localhost:8001`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will start at `http://localhost:5173`

## 📱 Using the AI Features

### 1. Trip Planning Assistant
- Click the "Trip Assistant" button in the bottom-right corner
- Ask any travel-related questions
- Get instant AI-powered advice

### 2. Budget Optimizer
- Navigate to the Home page
- Scroll down to the "Budget Optimizer" section
- Enter your budget amount
- Get personalized optimization recommendations

### 3. Travel Insights
- Navigate to the Home page
- Scroll down to the "Travel Insights" section
- View community trends, popular destinations, and travel data
- Refresh to get updated insights

## 🔧 API Endpoints

### Trip Planning
```
POST /ai/trip-planning
Body: { "message": "user question" }
```

### Budget Optimization
```
POST /ai/optimize-budget
Body: { "budget": 2000 }
```

### Travel Insights
```
GET /ai/travel-insights
```

## 🐛 Troubleshooting

### "Failed to get trip planning advice"
- Check if GEMINI_API_KEY is set in .env
- Verify API key is correct
- Check internet connection
- Verify API quota hasn't exceeded (60 req/min)

### "Error loading insights"
- Ensure MongoDB is connected
- Check backend is running
- Verify user is logged in

### Build Errors
```bash
# Clear node_modules and reinstall
npm install

# For frontend
cd frontend
npm run build
```

## 📊 Backend Files Added

- `backend/Service/aiService.js` - AI service logic using Gemini API
- `backend/controllers/aiController.js` - API controllers
- `backend/routes/ai.js` - AI routes

## 🎨 Frontend Files Added

- `frontend/src/Components/AI/TripPlanningAssistant.jsx` - Chatbot component
- `frontend/src/Components/AI/BudgetOptimizer.jsx` - Budget optimizer
- `frontend/src/Components/AI/TravelInsights.jsx` - Insights dashboard
- `frontend/src/Components/AI/index.js` - Component exports

## 📝 Notes

- All features require user to be logged in
- Gemini API free tier is sufficient for development
- For production, consider upgrading to paid tier for higher limits
- Data is processed in real-time, no data is stored in AI logs

## 🎓 Future Enhancements

- Add AI-powered trip recommendations
- Implement smart destination suggestions
- Add travel cost predictions
- Real-time budget alerts
- Community sentiment analysis

---

For issues or questions, please check the GitHub repository or create an issue.
