import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Lesson title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  videoUrl: {
    type: String,
    required: [true, 'Video URL is required']
  },
  duration: {
    type: Number, // Duration in minutes
    required: [true, 'Duration is required']
  },
  order: {
    type: Number,
    required: true
  },
  isPreview: {
    type: Boolean,
    default: false
  },
  resources: [{
    title: String,
    url: String,
    type: {
      type: String,
      enum: ['pdf', 'link', 'code', 'other'],
      default: 'link'
    }
  }]
}, {
  timestamps: true
});

const chapterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Chapter title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  order: {
    type: Number,
    required: true
  },
  lessons: [lessonSchema]
}, {
  timestamps: true
});

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Course title is required'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Course description is required'],
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  longDescription: {
    type: String,
    trim: true,
    maxlength: [2000, 'Long description cannot be more than 2000 characters']
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  thumbnail: {
    type: String,
    required: [true, 'Course thumbnail is required']
  },
  instructor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Course must have an instructor']
  },
  category: {
    type: String,
    required: [true, 'Course category is required'],
    enum: ['react', 'node', 'javascript', 'fullstack', 'mern', 'html-css', 'vue', 'angular', 'python', 'other']
  },
  level: {
    type: String,
    required: [true, 'Course level is required'],
    enum: ['beginner', 'intermediate', 'advanced']
  },
  tags: [{
    type: String,
    trim: true
  }],
  price: {
    type: Number,
    default: 0
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  chapters: [chapterSchema],
  whatYouWillLearn: [{
    type: String,
    trim: true
  }],
  requirements: [{
    type: String,
    trim: true
  }],
  targetAudience: [{
    type: String,
    trim: true
  }],
  enrollments: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
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
      type: mongoose.Schema.ObjectId
    }],
    lastAccessedAt: Date
  }],
  reviews: [{
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      trim: true,
      maxlength: [500, 'Review comment cannot be more than 500 characters']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
    set: (val) => Math.round(val * 10) / 10 // Round to 1 decimal place
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  totalEnrollments: {
    type: Number,
    default: 0
  },
  language: {
    type: String,
    default: 'en'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
courseSchema.index({ category: 1, level: 1 });
courseSchema.index({ isPublished: 1, isFeatured: -1 });
courseSchema.index({ averageRating: -1 });
courseSchema.index({ totalEnrollments: -1 });
courseSchema.index({ createdAt: -1 });
courseSchema.index({ slug: 1 });
courseSchema.index({ tags: 1 });

// Virtual for total duration
courseSchema.virtual('totalDuration').get(function() {
  let totalMinutes = 0;
  this.chapters.forEach(chapter => {
    chapter.lessons.forEach(lesson => {
      totalMinutes += lesson.duration;
    });
  });
  return totalMinutes;
});

// Virtual for total lessons count
courseSchema.virtual('totalLessons').get(function() {
  let totalLessons = 0;
  this.chapters.forEach(chapter => {
    totalLessons += chapter.lessons.length;
  });
  return totalLessons;
});

// Pre-save middleware to generate slug
courseSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/\s+/g, '-');
  }
  next();
});

// Pre-save middleware to update lastUpdated
courseSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

// Calculate average rating when reviews are updated
courseSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) {
    this.averageRating = 0;
    this.totalReviews = 0;
  } else {
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.averageRating = sum / this.reviews.length;
    this.totalReviews = this.reviews.length;
  }
};

// Static method to get featured courses
courseSchema.statics.getFeatured = function() {
  return this.find({ isPublished: true, isFeatured: true })
    .sort({ averageRating: -1, totalEnrollments: -1 })
    .populate('instructor', 'firstName lastName avatar')
    .limit(6);
};

// Static method to get courses by category
courseSchema.statics.getByCategory = function(category) {
  return this.find({ isPublished: true, category })
    .sort({ averageRating: -1 })
    .populate('instructor', 'firstName lastName avatar');
};

// Static method to search courses
courseSchema.statics.searchCourses = function(searchTerm, filters = {}) {
  const query = { isPublished: true };
  
  if (searchTerm) {
    query.$or = [
      { title: { $regex: searchTerm, $options: 'i' } },
      { description: { $regex: searchTerm, $options: 'i' } },
      { tags: { $in: [new RegExp(searchTerm, 'i')] } }
    ];
  }
  
  if (filters.category && filters.category !== 'all') {
    query.category = filters.category;
  }
  
  if (filters.level && filters.level !== 'all') {
    query.level = filters.level;
  }
  
  return this.find(query)
    .populate('instructor', 'firstName lastName avatar')
    .sort(filters.sortBy || { averageRating: -1 });
};

const Course = mongoose.model('Course', courseSchema);

export default Course;