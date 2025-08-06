import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  PlayIcon, 
  CodeBracketIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  StarIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const Home = () => {
  const featuredCourses = [
    {
      id: 1,
      title: "Complete React.js Course",
      description: "Learn React from basics to advanced concepts with real-world projects",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
      duration: "12 hours",
      level: "Beginner to Advanced",
      students: "45,000+",
      rating: 4.9,
      price: "Free",
      tags: ["React", "JavaScript", "Frontend"]
    },
    {
      id: 2,
      title: "Full Stack MERN Development",
      description: "Build complete web applications using MongoDB, Express, React, and Node.js",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400",
      duration: "20 hours",
      level: "Intermediate",
      students: "32,000+",
      rating: 4.8,
      price: "Free",
      tags: ["MERN", "Full Stack", "MongoDB"]
    },
    {
      id: 3,
      title: "JavaScript Mastery",
      description: "Master JavaScript fundamentals and advanced concepts for modern web development",
      image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400",
      duration: "15 hours",
      level: "Beginner to Advanced",
      students: "67,000+",
      rating: 4.9,
      price: "Free",
      tags: ["JavaScript", "ES6", "Async/Await"]
    }
  ];

  const features = [
    {
      icon: PlayIcon,
      title: "High-Quality Video Tutorials",
      description: "Step-by-step video lessons with clear explanations and practical examples"
    },
    {
      icon: CodeBracketIcon,
      title: "Hands-on Projects",
      description: "Build real-world applications and add them to your portfolio"
    },
    {
      icon: RocketLaunchIcon,
      title: "Career-Focused Learning",
      description: "Learn skills that are in high demand in the job market"
    },
    {
      icon: UserGroupIcon,
      title: "Community Support",
      description: "Join thousands of developers and get help when you need it"
    }
  ];

  const stats = [
    { number: "1M+", label: "Students Worldwide" },
    { number: "500+", label: "Video Tutorials" },
    { number: "50+", label: "Complete Courses" },
    { number: "4.9", label: "Average Rating" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Frontend Developer at Google",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      content: "GreatStack's tutorials helped me land my dream job at Google. The projects are amazing!"
    },
    {
      name: "Mike Chen",
      role: "Full Stack Developer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      content: "Best programming tutorials on the internet. Clear explanations and practical projects."
    },
    {
      name: "Emily Davis",
      role: "Freelance Developer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      content: "Started from zero programming knowledge. Now I'm earning $80k+ as a freelancer!"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full animate-pulse animation-delay-1000"></div>
          <div className="absolute bottom-20 left-32 w-12 h-12 bg-white rounded-full animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-32 right-10 w-24 h-24 bg-white rounded-full animate-pulse animation-delay-3000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Learn <span className="text-secondary-500">Web Development</span>
              <br />
              Build Amazing Projects
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Master modern web development with our practical, project-based tutorials. 
              From beginner to advanced, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/courses" className="btn-secondary text-lg px-8 py-4">
                Start Learning Now
              </Link>
              <a 
                href="https://youtube.com/@greatstack" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-outline text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary-900"
              >
                <PlayIcon className="w-6 h-6 inline mr-2" />
                Watch on YouTube
              </a>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-secondary-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-200">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose GreatStack?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide the best learning experience with practical, real-world projects 
              that prepare you for your career in web development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="feature-card text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start your journey with our most popular courses, designed to take you 
              from beginner to professional developer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="course-card"
              >
                <div className="relative">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold">
                    {course.price}
                  </div>
                </div>
                <div className="p-6">
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
                      {course.rating} ({course.students} students)
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-primary-100 text-primary-600 rounded text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span>{course.duration}</span>
                    <span>{course.level}</span>
                  </div>
                  <Link
                    to={`/courses/${course.id}`}
                    className="w-full btn-primary text-center flex items-center justify-center"
                  >
                    Start Learning
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/courses" className="btn-outline">
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of successful developers who started their journey with GreatStack.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-xl"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Start Your Coding Journey?
            </h2>
            <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Join millions of developers worldwide who are building amazing applications 
              and advancing their careers with GreatStack.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup" className="btn-secondary text-lg px-8 py-4">
                Get Started for Free
              </Link>
              <Link to="/courses" className="btn-outline border-white text-white hover:bg-white hover:text-primary-900 text-lg px-8 py-4">
                Browse Courses
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;