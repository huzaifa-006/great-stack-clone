import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [50, 'First name cannot be more than 50 characters']
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [50, 'Last name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters'],
    select: false // Don't include password in queries by default
  },
  avatar: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['student', 'instructor', 'admin'],
    default: 'student'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  enrolledCourses: [{
    course: {
      type: mongoose.Schema.ObjectId,
      ref: 'Course'
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    completedLessons: [{
      type: mongoose.Schema.ObjectId,
      ref: 'Lesson'
    }]
  }],
  preferences: {
    newsletter: {
      type: Boolean,
      default: true
    },
    notifications: {
      type: Boolean,
      default: true
    },
    language: {
      type: String,
      default: 'en'
    }
  },
  lastLoginAt: Date,
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  verificationToken: String
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for enrollment count
userSchema.virtual('enrollmentCount').get(function() {
  return this.enrolledCourses.length;
});

// Index for faster queries
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ createdAt: -1 });

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Instance method to check password
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Instance method to update last login
userSchema.methods.updateLastLogin = function() {
  this.lastLoginAt = new Date();
  return this.save({ validateBeforeSave: false });
};

// Static method to find by email
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.resetPasswordToken;
  delete userObject.resetPasswordExpire;
  delete userObject.verificationToken;
  delete userObject.__v;
  return userObject;
};

const User = mongoose.model('User', userSchema);

export default User;