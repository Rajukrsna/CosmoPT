# 🚀 CosmoPT - Interactive Space Science Education Platform

<div align="center">
  <img src="./logo.svg" alt="CosmoPT Logo" width="200" height="200">
  
  [![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
  [![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green.svg)](https://www.mongodb.com/)
  [![Vite](https://img.shields.io/badge/Vite-5.0+-purple.svg)](https://vitejs.dev/)
</div>

## 🌌 About CosmoPT

CosmoPT is an interactive educational platform that combines space science with physics experiments to create an engaging learning experience. Students can explore the cosmos, conduct physics simulations, take quizzes, and embark on virtual space missions.

### ✨ Key Features

- **🧪 Interactive Physics Experiments**: Collision dynamics, pendulum motion, projectile physics, and more
- **🌍 Solar System Exploration**: Interactive 3D solar system with detailed planetary information
- **🚀 Mission Simulator**: Realistic space mission scenarios with decision-making challenges
- **📚 Educational Quizzes**: Adaptive quizzes covering astronomy, physics, and space science
- **🎯 Gamification**: Points system, achievements, and progress tracking
- **🤖 AI ChatBot**: Intelligent assistant for learning support
- **👤 User Management**: Secure authentication with personalized profiles
- **📱 Responsive Design**: Works seamlessly across desktop and mobile devices

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Matter.js** for physics simulations
- **Axios** for API communication
- **React Router** for navigation
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests
- **dotenv** for environment configuration

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rajukrsna/CosmoPT.git
   cd CosmoPT
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Set up environment variables**
   
   **Root `.env` file:**
   ```bash
   # Frontend Configuration
   VITE_API_BASE_URL=http://localhost:5000/api/users
   VITE_PORT=5173
   VITE_NODE_ENV=development
   ```
   
   **Backend `.env` file:**
   ```bash
   # Server Configuration
   PORT=5000
   
   # MongoDB Configuration
   MONGO_URI=mongodb://localhost:27017/cosmopt
   # Or use MongoDB Atlas:
   # MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/CosmoDB
   
   # JWT Configuration
   JWT_SECRET=your_secure_jwt_secret_key_here
   
   # Node Environment
   NODE_ENV=development
   
   # CORS Configuration
   FRONTEND_URL=http://localhost:5173
   ```

5. **Start the development servers**
   
   **Terminal 1 - Backend:**
   ```bash
   cd backend
   npm start
   ```
   
   **Terminal 2 - Frontend:**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the application.

## 📁 Project Structure

```
CosmoPT/
├── 📁 src/                          # Frontend source code
│   ├── 📁 components/               # Reusable React components
│   │   ├── ChatBot.tsx             # AI-powered learning assistant
│   │   ├── Navigation.tsx          # Main navigation component
│   │   ├── Login.tsx & Register.tsx # Authentication forms
│   │   └── StarField.tsx           # Animated space background
│   ├── 📁 pages/                   # Main application pages
│   │   ├── Home.tsx                # Landing page
│   │   ├── SolarSystem.tsx         # Interactive solar system
│   │   ├── MissionSimulator.tsx    # Space mission scenarios
│   │   ├── Learning.tsx            # Educational content
│   │   └── TravelPlanner.tsx       # Space travel planning tool
│   ├── 📁 experiments/             # Physics simulation components
│   │   ├── collision.tsx           # Collision dynamics
│   │   ├── Pendulum.tsx           # Pendulum motion
│   │   ├── Projectile.js          # Projectile motion
│   │   └── Newton.tsx             # Newton's laws demo
│   ├── 📁 context/                 # React Context providers
│   │   ├── GameContext.tsx         # Game state management
│   │   └── userAuthContext.tsx     # User authentication
│   └── 📁 utils/                   # Utility functions
│       └── axios.ts                # API configuration
├── 📁 backend/                     # Backend server code
│   ├── server.js                   # Express server entry point
│   ├── 📁 models/                  # MongoDB data models
│   │   ├── User.js                 # User schema
│   │   ├── QuizSchema.js          # Quiz data model
│   │   ├── Mission.js             # Mission scenarios
│   │   ├── Planets.js             # Planet information
│   │   └── Vehicles.js            # Space vehicles data
│   ├── 📁 routes/                  # API route handlers
│   │   ├── authRoutes.js          # Authentication endpoints
│   │   ├── UserRoutes.js          # User management
│   │   └── fetchDataRoutes.js     # Data fetching endpoints
│   └── 📁 middleware/              # Express middleware
│       └── authMiddleware.js       # JWT authentication
└── 📁 public/                      # Static assets
    └── 📁 assets/                  # Images and media files
```

## 🎮 Features Overview

### 🧪 Physics Experiments
- **Collision Dynamics**: Explore elastic and inelastic collisions
- **Pendulum Motion**: Study simple harmonic motion
- **Projectile Motion**: Understand trajectory calculations
- **Inclined Plane**: Learn about forces and acceleration
- **Newton's Laws**: Interactive demonstrations

### 🌍 Space Exploration
- **Solar System**: 3D interactive model with planetary data
- **Mission Planning**: Create and execute space missions
- **Travel Calculator**: Calculate distances and travel times
- **Destination Guide**: Detailed information about celestial bodies

### 📚 Learning System
- **Adaptive Quizzes**: Questions that adjust to user skill level
- **Achievement System**: Unlock badges and rewards
- **Progress Tracking**: Monitor learning journey
- **Interactive Labs**: Hands-on experiments

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### User Management
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id/points` - Update user points
- `PUT /api/users/:id/quiz` - Complete quiz
- `PUT /api/users/:id/visit` - Visit planet

### Data Fetching
- `GET /api/users/fetch/getQuiz` - Fetch quiz data
- `GET /api/users/fetch/getMission` - Fetch missions
- `GET /api/users/fetch/getVehicles` - Fetch vehicles
- `GET /api/users/fetch/getDestination` - Fetch destinations
- `GET /api/users/fetch/getLabs` - Fetch lab experiments

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Physics simulations powered by [Matter.js](https://brm.io/matter-js/)
- Icons by [Lucide React](https://lucide.dev/)
- Space data from various educational sources
- Inspiration from NASA educational programs

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/Rajukrsna/CosmoPT/issues) page
2. Create a new issue if needed
3. Contact the development team

---

<div align="center">
  <p>Made with ❤️ for space education enthusiasts</p>
  <p>🌟 Star this repo if you found it helpful!</p>
</div>
