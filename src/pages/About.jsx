import React from 'react';
import { motion } from 'framer-motion';
import { 
  PlayIcon,
  UserGroupIcon,
  AcademicCapIcon,
  TrophyIcon,
  HeartIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

const About = () => {
  const stats = [
    { number: "1M+", label: "Students Worldwide", icon: UserGroupIcon },
    { number: "500+", label: "Video Tutorials", icon: PlayIcon },
    { number: "50+", label: "Complete Courses", icon: AcademicCapIcon },
    { number: "4.9", label: "Average Rating", icon: TrophyIcon }
  ];

  const team = [
    {
      name: "Avinash Kumar",
      role: "Co-Founder & Lead Instructor",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300",
      bio: "Full-stack developer with 8+ years of experience. Passionate about teaching and creating practical coding tutorials."
    },
    {
      name: "Sarah Johnson",
      role: "Frontend Specialist",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300",
      bio: "React expert and UI/UX enthusiast. Creates beautiful, responsive interfaces and teaches modern frontend development."
    },
    {
      name: "Mike Chen",
      role: "Backend Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
      bio: "Node.js and database specialist. Focuses on building scalable backend systems and API development tutorials."
    },
    {
      name: "Emily Davis",
      role: "Content Creator",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300",
      bio: "Educational content specialist with a talent for breaking down complex concepts into easy-to-understand lessons."
    }
  ];

  const values = [
    {
      icon: HeartIcon,
      title: "Passion for Teaching",
      description: "We believe that great education comes from passionate instructors who care about student success."
    },
    {
      icon: RocketLaunchIcon,
      title: "Practical Learning",
      description: "Every course focuses on real-world projects and skills that you can immediately apply in your career."
    },
    {
      icon: UserGroupIcon,
      title: "Community First",
      description: "We foster a supportive community where students help each other learn and grow together."
    },
    {
      icon: TrophyIcon,
      title: "Quality Content",
      description: "We maintain high standards for all our content, ensuring every tutorial is clear, accurate, and valuable."
    }
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
              About GreatStack
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto">
              Empowering developers worldwide with practical, project-based learning experiences 
              that bridge the gap between theory and real-world application.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary-600" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                At GreatStack, we believe that everyone should have access to high-quality programming education. 
                Our mission is to democratize coding education by providing free, comprehensive tutorials that 
                teach real-world skills through hands-on projects.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                We're not just teaching syntax or theory – we're preparing the next generation of developers 
                to build amazing applications and solve real problems. Every course is designed with practical 
                applications in mind, ensuring our students graduate job-ready.
              </p>
              <p className="text-lg text-gray-700">
                From complete beginners to experienced developers looking to learn new technologies, 
                GreatStack provides a clear path to success in the ever-evolving world of web development.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600"
                alt="Team collaboration"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary-600 rounded-xl opacity-10"></div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-secondary-500 rounded-xl opacity-10"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do at GreatStack and shape 
              the learning experience we provide to our students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our diverse team of developers, educators, and content creators are passionate 
              about helping you succeed in your coding journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              Our Story
            </h2>
            <div className="text-lg text-gray-700 space-y-6 leading-relaxed">
              <p>
                GreatStack started as a simple YouTube channel with a mission to make programming 
                education accessible to everyone. What began as a passion project by a group of 
                developers has grown into a comprehensive learning platform serving over a million 
                students worldwide.
              </p>
              <p>
                We noticed that many programming tutorials focused too heavily on theory without 
                providing enough practical, real-world examples. That's why we decided to create 
                courses that bridge this gap – every tutorial includes hands-on projects that 
                students can add to their portfolios.
              </p>
              <p>
                Today, GreatStack continues to evolve, adding new courses, improving our content, 
                and building tools that make learning to code more engaging and effective. Our 
                community of learners and educators drives everything we do, and we're just 
                getting started.
              </p>
            </div>
          </motion.div>
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
              Join Our Community
            </h2>
            <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Be part of a growing community of developers who are building amazing 
              applications and advancing their careers with GreatStack.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/courses" 
                className="btn-secondary text-lg px-8 py-4"
              >
                Start Learning Today
              </a>
              <a 
                href="https://youtube.com/@greatstack" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-outline border-white text-white hover:bg-white hover:text-primary-900 text-lg px-8 py-4"
              >
                Subscribe on YouTube
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;