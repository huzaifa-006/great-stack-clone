import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  StarIcon,
  ClockIcon,
  UserGroupIcon,
  PlayIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    { id: 'all', name: 'All Courses', count: 47 },
    { id: 'react', name: 'React.js', count: 12 },
    { id: 'node', name: 'Node.js', count: 8 },
    { id: 'javascript', name: 'JavaScript', count: 15 },
    { id: 'fullstack', name: 'Full Stack', count: 6 },
    { id: 'mern', name: 'MERN Stack', count: 4 },
    { id: 'html-css', name: 'HTML & CSS', count: 8 }
  ];

  const levels = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ];

  const sortOptions = [
    { id: 'popular', name: 'Most Popular' },
    { id: 'newest', name: 'Newest First' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'duration', name: 'Duration' }
  ];

  const allCourses = [
    {
      id: 1,
      title: "Complete React.js Course",
      description: "Learn React from basics to advanced concepts with real-world projects",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
      duration: "12 hours",
      level: "beginner",
      students: 45230,
      rating: 4.9,
      reviews: 1250,
      price: "Free",
      category: "react",
      tags: ["React", "JavaScript", "Frontend", "Components"],
      instructor: "John Doe",
      updated: "2024-01-15"
    },
    {
      id: 2,
      title: "Full Stack MERN Development",
      description: "Build complete web applications using MongoDB, Express, React, and Node.js",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400",
      duration: "20 hours",
      level: "intermediate",
      students: 32100,
      rating: 4.8,
      reviews: 890,
      price: "Free",
      category: "mern",
      tags: ["MERN", "Full Stack", "MongoDB", "Express"],
      instructor: "Sarah Johnson",
      updated: "2024-01-10"
    },
    {
      id: 3,
      title: "JavaScript Mastery",
      description: "Master JavaScript fundamentals and advanced concepts for modern web development",
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400",
      duration: "15 hours",
      level: "beginner",
      students: 67800,
      rating: 4.9,
      reviews: 2100,
      price: "Free",
      category: "javascript",
      tags: ["JavaScript", "ES6", "Async/Await", "DOM"],
      instructor: "Mike Chen",
      updated: "2024-01-20"
    },
    {
      id: 4,
      title: "Node.js Backend Development",
      description: "Learn server-side development with Node.js, Express, and MongoDB",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400",
      duration: "18 hours",
      level: "intermediate",
      students: 28500,
      rating: 4.7,
      reviews: 650,
      price: "Free",
      category: "node",
      tags: ["Node.js", "Express", "API", "Backend"],
      instructor: "Emily Davis",
      updated: "2024-01-08"
    },
    {
      id: 5,
      title: "Modern CSS & Responsive Design",
      description: "Master CSS Grid, Flexbox, and responsive design techniques",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
      duration: "10 hours",
      level: "beginner",
      students: 41200,
      rating: 4.8,
      reviews: 980,
      price: "Free",
      category: "html-css",
      tags: ["CSS", "Flexbox", "Grid", "Responsive"],
      instructor: "Alex Wilson",
      updated: "2024-01-12"
    },
    {
      id: 6,
      title: "Advanced React Patterns",
      description: "Learn advanced React patterns, performance optimization, and best practices",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400",
      duration: "14 hours",
      level: "advanced",
      students: 15600,
      rating: 4.9,
      reviews: 420,
      price: "Free",
      category: "react",
      tags: ["React", "Advanced", "Patterns", "Performance"],
      instructor: "Lisa Brown",
      updated: "2024-01-05"
    }
  ];

  const [filteredCourses, setFilteredCourses] = useState(allCourses);

  useEffect(() => {
    let filtered = allCourses;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    // Filter by level
    if (selectedLevel !== 'all') {
      filtered = filtered.filter(course => course.level === selectedLevel);
    }

    // Sort courses
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.students - a.students);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.updated) - new Date(a.updated));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'duration':
        filtered.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        break;
      default:
        break;
    }

    setFilteredCourses(filtered);
  }, [searchTerm, selectedCategory, selectedLevel, sortBy]);

  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Header Section */}
      <section className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Our Courses
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our comprehensive collection of web development courses designed to take you 
              from beginner to professional developer.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h3 className="text-lg font-semibold mb-4">Filters</h3>
              
              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={selectedCategory === category.id}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                      />
                      <span className="ml-3 text-sm text-gray-700 flex-1">
                        {category.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {category.count}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Levels */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Difficulty Level</h4>
                <div className="space-y-2">
                  {levels.map((level) => (
                    <label key={level.id} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="level"
                        value={level.id}
                        checked={selectedLevel === level.id}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                      />
                      <span className="ml-3 text-sm text-gray-700">
                        {level.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedLevel('all');
                  setSearchTerm('');
                }}
                className="w-full text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sort Bar */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* Sort */}
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </select>

                  {/* Mobile Filter Toggle */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                  >
                    <AdjustmentsHorizontalIcon className="w-5 h-5" />
                    Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredCourses.length} of {allCourses.length} courses
              </p>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="course-card"
                >
                  <Link to={`/courses/${course.id}`} className="block">
                    <div className="relative">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold">
                        {course.price}
                      </div>
                      <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs capitalize">
                        {course.level}
                      </div>
                    </div>
                    <div className="p-6">
                      {/* Rating and Reviews */}
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
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
                        <span className="ml-2 text-sm text-gray-600">
                          {course.rating} ({formatNumber(course.reviews)} reviews)
                        </span>
                      </div>

                      {/* Title and Description */}
                      <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {course.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {course.tags.slice(0, 3).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-primary-100 text-primary-600 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Course Info */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          {course.duration}
                        </div>
                        <div className="flex items-center">
                          <UserGroupIcon className="w-4 h-4 mr-1" />
                          {formatNumber(course.students)}
                        </div>
                      </div>

                      {/* Instructor */}
                      <div className="text-sm text-gray-600 mb-4">
                        by {course.instructor}
                      </div>

                      {/* CTA Button */}
                      <div className="btn-primary w-full text-center flex items-center justify-center">
                        <PlayIcon className="w-4 h-4 mr-2" />
                        Start Learning
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* No Results */}
            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <MagnifyingGlassIcon className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No courses found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                    setSelectedLevel('all');
                  }}
                  className="btn-primary"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;