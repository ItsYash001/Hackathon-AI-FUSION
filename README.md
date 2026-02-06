# Campus Nexus - AI-Powered Campus Super-App 🎓

**Project Nexus** - Building the Ultimate Campus Ecosystem with AI/ML Integration

## 🌟 Overview

Campus Nexus is a full-stack unified campus application that integrates various aspects of college life into a single, intelligent platform. Built for the AI Fusion Hackathon 2026, this app leverages modern web technologies and AI/ML capabilities to transform the student experience.

## ✨ Key Features

### 1. 📧 AI Mail Summarizer (AI/ML Feature)
- **Intelligent Email Processing**: Uses NLP to summarize lengthy college emails into one-sentence summaries
- **Smart Categorization**: Automatically categorizes emails (Academic, Events, Urgent, Administrative)
- **Priority Scoring**: AI-powered priority ranking (1-5 scale)
- **Action Item Extraction**: Automatically extracts deadlines and action items
- **Sentiment Analysis**: Detects email sentiment (positive/neutral/negative)
- **Tag Generation**: Auto-generates relevant tags for easy searching

### 2. 🍽️ Live Mess Menu
- Daily meal display with nutritional information
- Crowd-sourced ratings and reviews
- Dietary filters and allergen warnings
- Personalized recommendations based on user preferences
- Real-time updates

### 3. 🛒 Smart Marketplace
- **AI Price Recommendation Engine**: Suggests optimal prices based on market data
- Buy/Sell platform for textbooks, electronics, furniture, cycles
- Image uploads with condition assessment
- User ratings and verification
- Wishlist and price alerts
- Search and filter capabilities

### 4. 🔍 Lost & Found
- Report missing and found items
- AI-powered object recognition (ready for integration)
- Location-based matching
- Smart notifications
- Category tagging

### 5. 🚗 Travel Sharing (Cab-Pool)
- Match students traveling to common destinations
- Cost-splitting calculator
- Real-time trip coordination
- Route optimization ready

### 6. 📍 Nearby Explorer
- Curated directory of Rupnagar/Ropar locations
- User ratings and reviews
- "Vibe" tags (study-friendly, budget, date-spot)
- Distance calculations

### 7. 📅 Academic Cockpit
- Live timetable management
- LMS Lite for assignments and grades
- Exam countdowns
- Academic analytics

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express.js**: RESTful API
- **MongoDB** + **Mongoose**: Database
- **JWT**: Authentication
- **Natural**: NLP library for text processing
- **OpenAI API**: Advanced AI summarization (optional)
- **bcryptjs**: Password hashing

### Frontend
- **React.js**: UI framework
- **React Router**: Navigation
- **CSS3**: Styling with modern design
- **Axios**: HTTP client

### AI/ML Components
- Natural Language Processing (NLP) for mail summarization
- TF-IDF for extractive text summarization
- Sentiment analysis
- Price recommendation algorithm
- (Ready for): Computer vision, predictive analytics

## 🤖 AI/ML Features Explained

### 1. Mail Summarizer Service
**File**: `services/mailSummarizer.js`

**Capabilities**:
- **Extractive Summarization**: Uses TF-IDF algorithm to identify most important sentences
- **Category Classification**: Keyword-based categorization with scoring system
- **Priority Calculation**: Analyzes urgency keywords and deadlines
- **Action Item Extraction**: Identifies imperative verbs and deadline patterns
- **Sentiment Analysis**: AFINN-based sentiment scoring
- **Tag Generation**: Tokenization with stopword filtering

**Usage Example**:
```javascript
const mailSummarizer = require('./services/mailSummarizer');

const result = await mailSummarizer.processEmail(
  'Important: Assignment Submission',
  'dean@college.edu',
  'Please submit your ML assignment by 15th Feb...'
);

// Returns: {
//   summary: "Submit ML assignment by Feb 15th",
//   category: "academic",
//   priority: 4,
//   actionItems: [...],
//   sentiment: "neutral",
//   tags: ["assignment", "submission", "deadline"]
// }
```

### 2. Price Recommendation Engine
**Location**: `routes/marketplace.js` - `recommendPrice()`

**How it works**:
- Analyzes recent sales in same category (last 90 days)
- Calculates average market price
- Applies condition-based depreciation factors
- Falls back to standard depreciation model if insufficient data

## 🎨 Frontend Components

### Dashboard
- Unified view of all app features
- Real-time stats and quick actions
- Today's mess menu preview
- Priority announcements

### Mail Dashboard
- Interactive mail list with filters
- Category and priority badges
- AI-generated summaries display
- Action items and deadlines
- Original email viewer

### Marketplace
- Grid/List view toggle
- AI price recommendations
- Image upload support
- Advanced filtering

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Role-based access control
- Input validation
- XSS protection

## 📊 Database Schema Highlights

### User Model
```javascript
{
  name, email, password,
  role: ['student', 'instructor', 'admin'],
  studentId, department, year, hostel,
  preferences: { dietaryRestrictions, interests, notifications }
}
```

### Mail Model
```javascript
{
  subject, sender, originalContent, summary,
  category, priority, actionItems,
  sentiment, tags, recipients,
  isRead, dateReceived
}
```

## 🚧 Future Enhancements

- [ ] Computer Vision for Lost & Found image recognition
- [ ] Predictive analytics for mess crowd levels
- [ ] Real-time notifications with WebSockets
- [ ] Mobile app (React Native)
- [ ] AR navigation for campus
- [ ] Voice assistant integration
- [ ] Blockchain for secure transactions
- [ ] Advanced recommendation systems

## 🤝 Contributing

This project was built for AI Fusion Hackathon 2026. Contributions are welcome!
## 📄 License

MIT License - feel free to use this project for learning and development.

---

**Built with ❤️ for AI Fusion Hackathon 2026**

*Where AI meets everyday campus life* 🎓✨
