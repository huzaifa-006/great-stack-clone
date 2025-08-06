import express from 'express';
import Course from '../models/Course.js';
import User from '../models/User.js';
import { protect, restrictTo, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// @desc    Get all courses with filtering, sorting, and pagination
// @route   GET /api/courses
// @access  Public
const getAllCourses = async (req, res) => {
  try {
    const {
      category,
      level,
      search,
      sort = '-averageRating',
      page = 1,
      limit = 12,
      featured
    } = req.query;

    // Build query
    const query = { isPublished: true };

    if (category && category !== 'all') {
      query.category = category;
    }

    if (level && level !== 'all') {
      query.level = level;
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Execute query with population and pagination
    const skip = (page - 1) * limit;
    
    const [courses, total] = await Promise.all([
      Course.find(query)
        .populate('instructor', 'firstName lastName avatar')
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit)),
      Course.countDocuments(query)
    ]);

    res.status(200).json({
      status: 'success',
      results: courses.length,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      data: {
        courses
      }
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message || 'Could not fetch courses'
    });
  }
};

// @desc    Get featured courses
// @route   GET /api/courses/featured
// @access  Public
const getFeaturedCourses = async (req, res) => {
  try {
    const courses = await Course.getFeatured();

    res.status(200).json({
      status: 'success',
      results: courses.length,
      data: {
        courses
      }
    });
  } catch (error) {
    console.error('Get featured courses error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message || 'Could not fetch featured courses'
    });
  }
};

// @desc    Get course by ID or slug
// @route   GET /api/courses/:id
// @access  Public
const getCourse = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Try to find by ObjectId first, then by slug
    let course;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      course = await Course.findById(id);
    } else {
      course = await Course.findOne({ slug: id });
    }

    if (!course) {
      return res.status(404).json({
        status: 'error',
        message: 'Course not found'
      });
    }

    // Populate instructor and reviews
    await course.populate([
      {
        path: 'instructor',
        select: 'firstName lastName avatar bio'
      },
      {
        path: 'reviews.user',
        select: 'firstName lastName avatar'
      }
    ]);

    // Check if user is enrolled (if authenticated)
    let isEnrolled = false;
    if (req.user) {
      const enrollment = course.enrollments.find(
        enrollment => enrollment.user.toString() === req.user._id.toString()
      );
      isEnrolled = !!enrollment;
    }

    res.status(200).json({
      status: 'success',
      data: {
        course,
        isEnrolled
      }
    });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message || 'Could not fetch course'
    });
  }
};

// @desc    Enroll in a course
// @route   POST /api/courses/:id/enroll
// @access  Private
const enrollInCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        status: 'error',
        message: 'Course not found'
      });
    }

    // Check if already enrolled
    const existingEnrollment = course.enrollments.find(
      enrollment => enrollment.user.toString() === req.user._id.toString()
    );

    if (existingEnrollment) {
      return res.status(400).json({
        status: 'error',
        message: 'Already enrolled in this course'
      });
    }

    // Add enrollment to course
    course.enrollments.push({
      user: req.user._id,
      enrolledAt: new Date()
    });
    course.totalEnrollments = course.enrollments.length;

    // Add course to user's enrolled courses
    const user = await User.findById(req.user._id);
    user.enrolledCourses.push({
      course: course._id,
      enrolledAt: new Date()
    });

    await Promise.all([course.save(), user.save()]);

    res.status(200).json({
      status: 'success',
      message: 'Successfully enrolled in course',
      data: {
        enrollment: {
          course: course._id,
          enrolledAt: new Date(),
          progress: 0
        }
      }
    });
  } catch (error) {
    console.error('Enrollment error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message || 'Could not enroll in course'
    });
  }
};

// @desc    Add review to course
// @route   POST /api/courses/:id/reviews
// @access  Private
const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        status: 'error',
        message: 'Course not found'
      });
    }

    // Check if user is enrolled
    const isEnrolled = course.enrollments.some(
      enrollment => enrollment.user.toString() === req.user._id.toString()
    );

    if (!isEnrolled) {
      return res.status(400).json({
        status: 'error',
        message: 'You must be enrolled in this course to leave a review'
      });
    }

    // Check if user already reviewed
    const existingReview = course.reviews.find(
      review => review.user.toString() === req.user._id.toString()
    );

    if (existingReview) {
      return res.status(400).json({
        status: 'error',
        message: 'You have already reviewed this course'
      });
    }

    // Add review
    course.reviews.push({
      user: req.user._id,
      rating,
      comment,
      createdAt: new Date()
    });

    // Recalculate average rating
    course.calculateAverageRating();
    await course.save();

    // Populate the new review
    await course.populate('reviews.user', 'firstName lastName avatar');

    res.status(201).json({
      status: 'success',
      message: 'Review added successfully',
      data: {
        review: course.reviews[course.reviews.length - 1]
      }
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message || 'Could not add review'
    });
  }
};

// @desc    Get course categories with counts
// @route   GET /api/courses/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    const categories = await Course.aggregate([
      { $match: { isPublished: true } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        categories
      }
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message || 'Could not fetch categories'
    });
  }
};

// @desc    Create new course (Admin/Instructor only)
// @route   POST /api/courses
// @access  Private
const createCourse = async (req, res) => {
  try {
    const courseData = {
      ...req.body,
      instructor: req.user._id
    };

    const course = await Course.create(courseData);
    await course.populate('instructor', 'firstName lastName avatar');

    res.status(201).json({
      status: 'success',
      data: {
        course
      }
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message || 'Could not create course'
    });
  }
};

// Routes
router.get('/featured', getFeaturedCourses);
router.get('/categories', getCategories);
router.get('/', getAllCourses);
router.get('/:id', optionalAuth, getCourse);

// Protected routes
router.use(protect);
router.post('/:id/enroll', enrollInCourse);
router.post('/:id/reviews', addReview);

// Admin/Instructor only routes
router.post('/', restrictTo('admin', 'instructor'), createCourse);

export default router;