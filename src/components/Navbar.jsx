import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bars3Icon, 
  XMarkIcon, 
  PlayIcon,
  BookOpenIcon,
  UserIcon 
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/', icon: PlayIcon },
    { name: 'Courses', href: '/courses', icon: BookOpenIcon },
    { name: 'About', href: '/about', icon: UserIcon },
    { name: 'Contact', href: '/contact', icon: UserIcon },
  ];

  const isActiveLink = (href) => {
    return location.pathname === href;
  };

  return (
    <motion.nav 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
              <PlayIcon className="w-5 h-5 text-white" />
            </div>
            <span className={`text-xl font-bold transition-colors duration-300 ${
              scrolled ? 'text-gray-900' : 'text-white'
            }`}>
              GreatStack
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                  isActiveLink(item.href)
                    ? scrolled 
                      ? 'text-primary-600 border-b-2 border-primary-600' 
                      : 'text-white border-b-2 border-white'
                    : scrolled 
                      ? 'text-gray-700 hover:text-primary-600' 
                      : 'text-white/90 hover:text-white'
                } pb-1`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className={`text-sm font-medium transition-all duration-300 hover:scale-105 ${
                scrolled 
                  ? 'text-gray-700 hover:text-primary-600' 
                  : 'text-white/90 hover:text-white'
              }`}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="btn-primary text-sm"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors duration-300 ${
                scrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {isOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200 shadow-lg"
          >
            <div className="px-4 py-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                    isActiveLink(item.href)
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-primary-600'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-200 pt-2 mt-2">
                <Link
                  to="/login"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-600 rounded-lg transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block mx-3 my-2 text-center btn-primary text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;