# GreatStack Clone - Full Stack Education Platform

A modern, full-featured educational platform inspired by GreatStack, built with React.js and Node.js. This platform provides a comprehensive learning experience with user authentication, course management, progress tracking, and an intuitive user interface.

## 🚀 Features

### Frontend (React.js)
- **Modern UI/UX** - Responsive design with Tailwind CSS and Framer Motion animations
- **Authentication** - Complete signup/login system with form validation
- **Course Catalog** - Browse, search, and filter courses by category and level
- **Course Player** - Detailed course pages with video lessons and progress tracking
- **User Dashboard** - Personal learning dashboard with enrolled courses and progress
- **Responsive Design** - Mobile-first approach with perfect mobile experience

### Backend (Node.js/Express)
- **RESTful API** - Well-structured API endpoints with proper error handling
- **Authentication & Authorization** - JWT-based auth with role-based access control
- **Database Integration** - MongoDB with Mongoose for data modeling
- **User Management** - Complete user profiles and enrollment system
- **Course Management** - Full CRUD operations for courses and lessons
- **Review System** - Course reviews and ratings functionality

### Key Components
- **🏠 Homepage** - Hero section, featured courses, testimonials, and CTAs
- **📚 Courses Page** - Advanced filtering, search, and pagination
- **📖 Course Details** - Comprehensive course information and enrollment
- **👤 User Authentication** - Secure login/signup with password strength indicators
- **📱 Responsive Navigation** - Mobile-friendly navigation with animations
- **📞 Contact Page** - Contact form with social media integration

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with modern hooks and features
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Heroicons & React Icons** - Beautiful icon sets
- **Axios** - HTTP client for API calls
- **Vite** - Fast build tool and development server

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### 1. Clone the Repository
```bash
git clone <repository-url>
cd greatstack-clone
```

### 2. Install Frontend Dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Install Backend Dependencies
```bash
cd backend
npm install
```

### 4. Environment Configuration
Create a `.env` file in the backend directory:
```bash
cd backend
cp .env.example .env
```

Update the environment variables:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/greatstack
JWT_SECRET=your-super-secret-jwt-key
CLIENT_URL=http://localhost:5173
```

### 5. Start MongoDB
Make sure MongoDB is running on your system:
```bash
# For local MongoDB
mongod

# Or use MongoDB Atlas cloud database
# Update MONGODB_URI in .env file
```

### 6. Run the Application

#### Start Backend Server
```bash
cd backend
npm run dev
```
Backend will run on http://localhost:5000

#### Start Frontend Development Server
```bash
# In root directory
npm run dev
```
Frontend will run on http://localhost:5173

## 📚 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `PATCH /api/auth/me` - Update user profile

### Course Endpoints
- `GET /api/courses` - Get all courses (with filtering)
- `GET /api/courses/featured` - Get featured courses
- `GET /api/courses/:id` - Get course by ID
- `POST /api/courses/:id/enroll` - Enroll in course
- `POST /api/courses/:id/reviews` - Add course review

### User Endpoints
- `GET /api/users/my-courses` - Get enrolled courses
- `GET /api/users/dashboard` - Get dashboard data
- `PATCH /api/users/courses/:id/progress` - Update progress

## 🎨 Design Features

### UI/UX Highlights
- **Gradient Backgrounds** - Beautiful gradient hero sections
- **Card-based Layout** - Modern card designs for courses and content
- **Smooth Animations** - Framer Motion animations throughout
- **Responsive Design** - Perfect experience on all devices
- **Loading States** - Elegant loading spinners and states
- **Form Validation** - Real-time form validation with helpful error messages

### Color Scheme
- **Primary** - Blue gradient (#3b82f6 to #1d4ed8)
- **Secondary** - Orange accent (#f59e0b)
- **Background** - Light gray (#f9fafb)
- **Text** - Dark gray (#1f2937)

## 🔧 Development

### Available Scripts

#### Frontend
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

#### Backend
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

### Project Structure
```
greatstack-clone/
├── src/                    # Frontend source code
│   ├── components/         # Reusable React components
│   ├── pages/             # Page components
│   ├── assets/            # Static assets
│   └── App.jsx            # Main App component
├── backend/               # Backend source code
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   └── index.js           # Server entry point
├── public/                # Public assets
└── package.json           # Frontend dependencies
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Configure environment variables

### Backend (Railway/Heroku/DigitalOcean)
1. Set up MongoDB Atlas for production database
2. Configure environment variables
3. Deploy backend to your chosen platform
4. Update CORS settings for production domain

### Environment Variables for Production
```env
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/greatstack
JWT_SECRET=super-secure-production-secret
CLIENT_URL=https://yourdomain.com
```

## 🌟 Key Features Implemented

### ✅ Authentication System
- User registration with validation
- Secure login with JWT tokens
- Password strength indicators
- Protected routes and middleware

### ✅ Course Management
- Course catalog with filtering
- Course details with enrollment
- Progress tracking system
- Review and rating system

### ✅ Modern UI/UX
- Responsive design for all devices
- Smooth animations and transitions
- Loading states and error handling
- Intuitive navigation and user flow

### ✅ Backend Architecture
- RESTful API design
- MongoDB database integration
- Authentication middleware
- Error handling and validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**GreatStack Clone Project**
- Educational platform inspired by GreatStack
- Built with modern web technologies
- Designed for learning and demonstration purposes

## 🙏 Acknowledgments

- Inspired by GreatStack's educational content
- UI/UX inspiration from modern educational platforms
- Built with love for the developer community

---

**Happy Learning! 🚀**
