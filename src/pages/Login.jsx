import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  EyeIcon, 
  EyeSlashIcon,
  PlayIcon 
} from '@heroicons/react/24/outline';
import { FaGoogle, FaGithub } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Login submitted:', formData);
      alert('Login successful! (This is a demo)');
      setIsLoading(false);
    }, 2000);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    alert(`${provider} login will be implemented with actual authentication service`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                <PlayIcon className="w-6 h-6 text-white" />
              </div>
              <span className="ml-3 text-2xl font-bold text-gray-900">GreatStack</span>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Sign in to continue your learning journey</p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <button
              onClick={() => handleSocialLogin('Google')}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300"
            >
              <FaGoogle className="w-5 h-5 text-red-500 mr-3" />
              <span className="text-gray-700 font-medium">Continue with Google</span>
            </button>
            <button
              onClick={() => handleSocialLogin('GitHub')}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300"
            >
              <FaGithub className="w-5 h-5 text-gray-800 mr-3" />
              <span className="text-gray-700 font-medium">Continue with GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Link
                to="/forgot-password"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary text-lg py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Sign up for free
              </Link>
            </p>
          </div>

          {/* Features */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-4">
              What you get with an account:
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center">
                <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                Track your learning progress
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                Save your favorite courses
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                Get personalized recommendations
              </li>
              <li className="flex items-center">
                <div className="w-2 h-2 bg-primary-600 rounded-full mr-3"></div>
                Join our community discussions
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;