import express from 'express';
import User from '../models/User.js';
import Course from '../models/Course.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.use(protect);

// @desc    Get user's enrolled courses
// @route   GET /api/users/my-courses
// @access  Private
const getMyCourses = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: 'enrolledCourses.course',
      populate: {
        path: 'instructor',
        select: 'firstName lastName avatar'
      }
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      results: user.enrolledCourses.length,
      data: {
        enrolledCourses: user.enrolledCourses
      }
    });
  } catch (error) {
    console.error('Get my courses error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message || 'Could not fetch enrolled courses'
    });
  }
};

// @desc    Update course progress
// @route   PATCH /api/users/courses/:courseId/progress
// @access  Private
const updateCourseProgress = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { lessonId, progress } = req.body;

    const user = await User.findById(req.user.id);
    const enrolledCourse = user.enrolledCourses.find(
      course => course.course.toString() === courseId
    );

    if (!enrolledCourse) {
      return res.status(404).json({
        status: 'error',
        message: 'Course not found in enrolled courses'
      });
    }

    // Update progress
    if (progress !== undefined) {
      enrolledCourse.progress = Math.min(Math.max(progress, 0), 100);
    }

    // Add completed lesson if provided
    if (lessonId && !enrolledCourse.completedLessons.includes(lessonId)) {
      enrolledCourse.completedLessons.push(lessonId);
    }

    await user.save();

    res.status(200).json({
      status: 'success',
      data: {
        progress: enrolledCourse.progress,
        completedLessons: enrolledCourse.completedLessons
      }
    });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message || 'Could not update progress'
    });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('enrolledCourses.course', 'title slug thumbnail category level')
      .select('-password');

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Calculate some statistics
    const stats = {
      totalCourses: user.enrolledCourses.length,
      completedCourses: user.enrolledCourses.filter(course => course.progress === 100).length,
      averageProgress: user.enrolledCourses.length > 0 
        ? Math.round(user.enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / user.enrolledCourses.length)
        : 0
    };

    res.status(200).json({
      status: 'success',
      data: {
        user,
        stats
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message || 'Could not fetch profile'
    });
  }
};

// @desc    Update user preferences
// @route   PATCH /api/users/preferences
// @access  Private
const updatePreferences = async (req, res) => {
  try {
    const { preferences } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { preferences },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      status: 'success',
      data: {
        preferences: user.preferences
      }
    });
  } catch (error) {
    console.error('Update preferences error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message || 'Could not update preferences'
    });
  }
};

// @desc    Get user dashboard data
// @route   GET /api/users/dashboard
// @access  Private
const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: 'enrolledCourses.course',
        populate: {
          path: 'instructor',
          select: 'firstName lastName avatar'
        }
      });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    // Get recent activity and stats
    const recentCourses = user.enrolledCourses
      .sort((a, b) => new Date(b.enrolledAt) - new Date(a.enrolledAt))
      .slice(0, 5);

    const inProgressCourses = user.enrolledCourses
      .filter(course => course.progress > 0 && course.progress < 100)
      .sort((a, b) => b.progress - a.progress);

    const stats = {
      totalCourses: user.enrolledCourses.length,
      completedCourses: user.enrolledCourses.filter(course => course.progress === 100).length,
      inProgressCourses: inProgressCourses.length,
      averageProgress: user.enrolledCourses.length > 0 
        ? Math.round(user.enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / user.enrolledCourses.length)
        : 0,
      totalLessonsCompleted: user.enrolledCourses.reduce((sum, course) => sum + course.completedLessons.length, 0)
    };

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          avatar: user.avatar,
          joinedAt: user.createdAt
        },
        stats,
        recentCourses,
        inProgressCourses
      }
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message || 'Could not fetch dashboard data'
    });
  }
};

// Admin only routes
// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      role,
      search
    } = req.query;

    const query = {};
    
    if (role && role !== 'all') {
      query.role = role;
    }

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find(query)
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      User.countDocuments(query)
    ]);

    res.status(200).json({
      status: 'success',
      results: users.length,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      },
      data: {
        users
      }
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message || 'Could not fetch users'
    });
  }
};

// @desc    Update user role (Admin only)
// @route   PATCH /api/users/:id/role
// @access  Private/Admin
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const { id } = req.params;

    if (!['student', 'instructor', 'admin'].includes(role)) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid role'
      });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(400).json({
      status: 'error',
      message: error.message || 'Could not update user role'
    });
  }
};

// Routes
router.get('/my-courses', getMyCourses);
router.patch('/courses/:courseId/progress', updateCourseProgress);
router.get('/profile', getProfile);
router.patch('/preferences', updatePreferences);
router.get('/dashboard', getDashboard);

// Admin only routes
router.get('/', restrictTo('admin'), getAllUsers);
router.patch('/:id/role', restrictTo('admin'), updateUserRole);

export default router;