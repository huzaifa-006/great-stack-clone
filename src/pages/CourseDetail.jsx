import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  PlayIcon, 
  StarIcon,
  ClockIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  BookOpenIcon,
  LanguageIcon
} from '@heroicons/react/24/outline';

const CourseDetail = () => {
  const { id } = useParams();
  
  // Mock course data - in real app, this would be fetched from API
  const course = {
    id: 1,
    title: "Complete React.js Course",
    description: "Master React.js from fundamentals to advanced concepts with hands-on projects. This comprehensive course covers everything you need to become a professional React developer.",
    longDescription: "This complete React.js course is designed to take you from a complete beginner to an advanced React developer. You'll learn the core concepts, modern best practices, and build real-world applications that you can add to your portfolio. The course covers React Hooks, Context API, Redux, testing, and deployment strategies.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
    duration: "12 hours",
    level: "Beginner to Advanced",
    students: 45230,
    rating: 4.9,
    reviews: 1250,
    price: "Free",
    category: "React",
    tags: ["React", "JavaScript", "Frontend", "Components", "Hooks", "Context"],
    instructor: {
      name: "John Doe",
      bio: "Senior Frontend Developer with 8+ years of experience",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      students: 125000,
      courses: 15
    },
    lastUpdated: "January 2024",
    language: "English",
    chapters: [
      {
        title: "Introduction to React",
        lessons: [
          { title: "What is React?", duration: "15 min", isCompleted: false },
          { title: "Setting up Development Environment", duration: "20 min", isCompleted: false },
          { title: "Create React App", duration: "10 min", isCompleted: false },
          { title: "Your First React Component", duration: "25 min", isCompleted: false }
        ]
      },
      {
        title: "React Fundamentals",
        lessons: [
          { title: "JSX Syntax", duration: "30 min", isCompleted: false },
          { title: "Components and Props", duration: "40 min", isCompleted: false },
          { title: "State and Events", duration: "35 min", isCompleted: false },
          { title: "Conditional Rendering", duration: "25 min", isCompleted: false }
        ]
      },
      {
        title: "Advanced React Concepts",
        lessons: [
          { title: "React Hooks", duration: "45 min", isCompleted: false },
          { title: "Context API", duration: "40 min", isCompleted: false },
          { title: "Custom Hooks", duration: "35 min", isCompleted: false },
          { title: "Performance Optimization", duration: "50 min", isCompleted: false }
        ]
      },
      {
        title: "Building Real Projects",
        lessons: [
          { title: "Todo App Project", duration: "60 min", isCompleted: false },
          { title: "Weather App", duration: "90 min", isCompleted: false },
          { title: "E-commerce Dashboard", duration: "120 min", isCompleted: false },
          { title: "Deployment to Vercel", duration: "30 min", isCompleted: false }
        ]
      }
    ],
    whatYouWillLearn: [
      "Master React.js fundamentals and advanced concepts",
      "Build interactive user interfaces with components",
      "Understand React Hooks and Context API",
      "Create responsive and modern web applications",
      "Learn state management with Redux (optional)",
      "Deploy your React applications to production",
      "Write clean, maintainable React code",
      "Build 3+ real-world projects for your portfolio"
    ],
    requirements: [
      "Basic knowledge of HTML, CSS, and JavaScript",
      "Understanding of ES6+ JavaScript features",
      "A computer with internet connection",
      "Text editor or IDE (VS Code recommended)"
    ]
  };

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  const calculateTotalDuration = () => {
    let totalMinutes = 0;
    course.chapters.forEach(chapter => {
      chapter.lessons.forEach(lesson => {
        const minutes = parseInt(lesson.duration.replace(' min', ''));
        totalMinutes += minutes;
      });
    });
    return Math.round(totalMinutes / 60 * 10) / 10; // Convert to hours
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link 
          to="/courses" 
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Courses
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {course.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-100 text-primary-600 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  {course.title}
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  {course.description}
                </p>
                
                {/* Course Stats */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <div className="flex items-center mr-2">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(course.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span>{course.rating} ({formatNumber(course.reviews)} reviews)</span>
                  </div>
                  <div className="flex items-center">
                    <UserGroupIcon className="w-4 h-4 mr-2" />
                    {formatNumber(course.students)} students
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    {calculateTotalDuration()} hours
                  </div>
                  <div className="flex items-center">
                    <LanguageIcon className="w-4 h-4 mr-2" />
                    {course.language}
                  </div>
                </div>
              </div>

              {/* Course Image */}
              <div className="relative rounded-xl overflow-hidden mb-8">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-64 md:h-80 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <button className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-300 transform hover:scale-110">
                    <PlayIcon className="w-8 h-8 text-primary-600 ml-1" />
                  </button>
                </div>
              </div>
            </div>

            {/* Course Description */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About This Course
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {course.longDescription}
              </p>
            </div>

            {/* What You'll Learn */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                What You'll Learn
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.whatYouWillLearn.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content */}
            <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Course Content
              </h2>
              <div className="space-y-4">
                {course.chapters.map((chapter, chapterIndex) => (
                  <div key={chapterIndex} className="border border-gray-200 rounded-lg">
                    <div className="p-4 bg-gray-50 border-b border-gray-200">
                      <h3 className="font-semibold text-gray-900 flex items-center">
                        <BookOpenIcon className="w-5 h-5 mr-2" />
                        {chapter.title}
                        <span className="ml-auto text-sm text-gray-500">
                          {chapter.lessons.length} lessons
                        </span>
                      </h3>
                    </div>
                    <div className="p-4">
                      <div className="space-y-2">
                        {chapter.lessons.map((lesson, lessonIndex) => (
                          <div key={lessonIndex} className="flex items-center justify-between py-2">
                            <div className="flex items-center">
                              <PlayIcon className="w-4 h-4 text-gray-400 mr-3" />
                              <span className="text-gray-700">{lesson.title}</span>
                            </div>
                            <span className="text-sm text-gray-500">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Requirements
              </h2>
              <ul className="space-y-2">
                {course.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Enrollment Card */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {course.price}
                  </div>
                  <p className="text-gray-600">Full lifetime access</p>
                </div>
                
                <button className="w-full btn-primary text-lg py-3 mb-4">
                  <PlayIcon className="w-5 h-5 mr-2" />
                  Start Learning Now
                </button>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    30-day money-back guarantee
                  </p>
                </div>
              </div>

              {/* Course Info */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  This course includes:
                </h3>
                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-3" />
                    {calculateTotalDuration()} hours on-demand video
                  </div>
                  <div className="flex items-center">
                    <BookOpenIcon className="w-4 h-4 mr-3" />
                    {course.chapters.length} sections
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 mr-3" />
                    Full lifetime access
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 mr-3" />
                    Access on mobile and TV
                  </div>
                  <div className="flex items-center">
                    <CheckCircleIcon className="w-4 h-4 mr-3" />
                    Certificate of completion
                  </div>
                </div>
              </div>

              {/* Instructor */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Instructor
                </h3>
                <div className="flex items-center mb-4">
                  <img
                    src={course.instructor.image}
                    alt={course.instructor.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {course.instructor.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {course.instructor.bio}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center text-sm">
                  <div>
                    <div className="font-semibold text-gray-900">
                      {formatNumber(course.instructor.students)}
                    </div>
                    <div className="text-gray-600">Students</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {course.instructor.courses}
                    </div>
                    <div className="text-gray-600">Courses</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;