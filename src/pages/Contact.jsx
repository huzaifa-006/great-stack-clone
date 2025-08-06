import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { FaYoutube, FaTwitter, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: EnvelopeIcon,
      title: "Email Us",
      description: "Get in touch via email",
      contact: "contact@greatstack.in",
      link: "mailto:contact@greatstack.in"
    },
    {
      icon: PhoneIcon,
      title: "Call Us",
      description: "Speak with our team",
      contact: "+91 98765 43210",
      link: "tel:+919876543210"
    },
    {
      icon: MapPinIcon,
      title: "Visit Us",
      description: "Our office location",
      contact: "Bangalore, Karnataka, India",
      link: "#"
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: "Live Chat",
      description: "Chat with support",
      contact: "Available 9 AM - 6 PM IST",
      link: "#"
    }
  ];

  const socialLinks = [
    { name: 'YouTube', icon: FaYoutube, href: 'https://youtube.com/@greatstack', color: '#FF0000' },
    { name: 'Twitter', icon: FaTwitter, href: 'https://twitter.com/greatstack', color: '#1DA1F2' },
    { name: 'LinkedIn', icon: FaLinkedin, href: 'https://linkedin.com/company/greatstack', color: '#0077B5' },
    { name: 'GitHub', icon: FaGithub, href: 'https://github.com/greatstack', color: '#333333' },
    { name: 'Instagram', icon: FaInstagram, href: 'https://instagram.com/greatstack', color: '#E4405F' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get In Touch
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Have questions about our courses? Need help with your learning journey? 
              We're here to help and would love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your full name"
                  />
                </div>
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
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                  placeholder="What is this about?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>
              <button
                type="submit"
                className="w-full btn-primary text-lg py-3"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Contact Information
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We're always excited to hear from our students and the developer community. 
                Reach out to us through any of the following channels.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 block"
                >
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                    <info.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {info.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {info.description}
                  </p>
                  <p className="text-primary-600 font-medium">
                    {info.contact}
                  </p>
                </motion.a>
              ))}
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                Follow Us
              </h3>
              <p className="text-gray-600 mb-6">
                Stay connected with us on social media for the latest updates, 
                tutorials, and community discussions.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-all duration-300"
                    whileHover={{ 
                      scale: 1.1, 
                      backgroundColor: social.color,
                      color: 'white'
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-6 h-6" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-primary-50 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Are all courses really free?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Yes! All our core courses are completely free. We believe in democratizing 
                    coding education and making it accessible to everyone.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    How can I get help with a specific course?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    You can leave comments on our YouTube videos, join our Discord community, 
                    or send us a message through this contact form.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Do you offer certificates?
                  </h4>
                  <p className="text-gray-600 text-sm">
                    We're working on implementing a certificate system. Stay tuned for updates 
                    on our social media channels!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Map Section (Optional - you can add a real map here) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Visit Our Office
            </h2>
            <p className="text-xl text-gray-600">
              Located in the heart of Bangalore's tech hub
            </p>
          </div>
          <div className="bg-gray-200 rounded-xl h-64 flex items-center justify-center">
            <p className="text-gray-500">Interactive Map Coming Soon</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;