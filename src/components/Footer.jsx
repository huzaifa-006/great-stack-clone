import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  PlayIcon,
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon 
} from '@heroicons/react/24/outline';
import { 
  FaYoutube, 
  FaTwitter, 
  FaLinkedin, 
  FaGithub, 
  FaInstagram 
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Team', href: '/team' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
    ],
    Courses: [
      { name: 'Web Development', href: '/courses?category=web' },
      { name: 'React.js', href: '/courses?category=react' },
      { name: 'Node.js', href: '/courses?category=node' },
      { name: 'Full Stack', href: '/courses?category=fullstack' },
    ],
    Resources: [
      { name: 'Blog', href: '/blog' },
      { name: 'Documentation', href: '/docs' },
      { name: 'Community', href: '/community' },
      { name: 'Support', href: '/support' },
    ],
    Legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'DMCA', href: '/dmca' },
    ],
  };

  const socialLinks = [
    { name: 'YouTube', icon: FaYoutube, href: 'https://youtube.com/@greatstack', color: '#FF0000' },
    { name: 'Twitter', icon: FaTwitter, href: 'https://twitter.com/greatstack', color: '#1DA1F2' },
    { name: 'LinkedIn', icon: FaLinkedin, href: 'https://linkedin.com/company/greatstack', color: '#0077B5' },
    { name: 'GitHub', icon: FaGithub, href: 'https://github.com/greatstack', color: '#333333' },
    { name: 'Instagram', icon: FaInstagram, href: 'https://instagram.com/greatstack', color: '#E4405F' },
  ];

  const contactInfo = [
    { icon: MapPinIcon, text: 'Bangalore, Karnataka, India' },
    { icon: EnvelopeIcon, text: 'contact@greatstack.in' },
    { icon: PhoneIcon, text: '+91 98765 43210' },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <PlayIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">GreatStack</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Learn web development with practical, real-world projects. Join millions of developers 
              building amazing applications with our comprehensive tutorials and courses.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-center space-x-3 text-gray-400">
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-lg font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Subscription */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-400 text-sm">
                Get the latest tutorials and web development tips delivered to your inbox.
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="px-6 py-2 bg-primary-600 hover:bg-primary-700 rounded-r-lg transition-colors duration-300 font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex space-x-4 mb-4 md:mb-0">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-all duration-300"
                  whileHover={{ 
                    scale: 1.1, 
                    backgroundColor: social.color,
                    rotate: 5 
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            
            {/* Statistics */}
            <div className="flex space-x-6 text-sm text-gray-400">
              <div className="text-center">
                <div className="text-xl font-bold text-white">1M+</div>
                <div>Students</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-white">500+</div>
                <div>Tutorials</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-white">50+</div>
                <div>Courses</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
            <div className="mb-2 md:mb-0">
              © {currentYear} GreatStack. All rights reserved.
            </div>
            <div className="flex items-center space-x-6">
              <span>Made with ❤️ for developers</span>
              <Link to="/sitemap" className="hover:text-white transition-colors duration-300">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;