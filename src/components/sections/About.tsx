'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Sparkles,
  Target,
  Eye,
  Award,
  Users,
  TrendingUp,
  MessageCircle
} from 'lucide-react'

const About = () => {
  const stats = [
    { number: '15', label: 'AI Projects Delivered', icon: Award },
    { number: '300%', label: 'Average ROI Increase', icon: TrendingUp },
    { number: '1', label: 'Years of Experience', icon: Target },
  ]

  const skills = [
    'Artificial Intelligence & Machine Learning',
    'Multi-Agent Systems Architecture',
    'Generative AI',
    'Natural Language Processing',
    'Computer Vision & Image Processing',
    'Full-Stack Web Development',
    'Mobile App Development',
    'Cloud Computing & DevOps',
    'Large Language Models',
    'Business Process Automation'
  ]

  const achievements = [
    'Built and deployed 15 AI-powered applications',
    'Helped startups achieve 300% ROI through AI automation',
    'Specialized in LLM API for lightning-fast AI responses',
    'Expert in multi-agent systems and intelligent automation',
    
    'Featured speaker at AI conferences and tech meetups'
  ]

  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-width">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-brown-100 border border-brown-200 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-brown-600" />
            <span className="text-sm text-brown-700 font-medium">
              About Our Founders
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Meet Our Founders</span>
          </h2>
          
          <p className="text-xl text-grey-700 max-w-3xl mx-auto">
            AI Engineers, Entrepreneurs, and Mentors passionate about transforming businesses 
            through intelligent automation and cutting-edge AI solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Founders Photos and Contact */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Founders Photos */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="flex flex-col items-center">
                <img 
                  src="/images/jeeee.jpeg" 
                  alt="Jai Keerthi - Founder" 
                  className="rounded-2xl shadow-lg w-48 h-auto object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    // First try the placeholder service
                    target.src = 'https://ui-avatars.com/api/?name=Jai+Keerthi&background=3b82f6&color=ffffff&size=192';
                    // If that also fails, use a simple fallback
                    target.onerror = () => {
                      target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 24 24"><rect width="100%" height="100%" fill="%233b82f6"/><text x="50%" y="50%" font-family="Arial" font-size="12" fill="white" text-anchor="middle" dy=".3em">JK</text></svg>';
                    };
                  }}
                />
                <h3 className="text-xl font-bold text-grey-900 mt-4">Jai Keerthi</h3>
                <p className="text-grey-600 text-sm">Founder</p>
              </div>
              <div className="flex flex-col items-center">
                <img 
                  src="/images/jd.jpeg" 
                  alt="Jagadish K - Founder" 
                  className="rounded-2xl shadow-lg w-48 h-auto object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    // First try the placeholder service
                    target.src = 'https://ui-avatars.com/api/?name=Jagadish+K&background=3b82f6&color=ffffff&size=192';
                    // If that also fails, use a simple fallback
                    target.onerror = () => {
                      target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 24 24"><rect width="100%" height="100%" fill="%233b82f6"/><text x="50%" y="50%" font-family="Arial" font-size="12" fill="white" text-anchor="middle" dy=".3em">JK</text></svg>';
                    };
                  }}
                />
                <h3 className="text-xl font-bold text-grey-900 mt-4">Jagadish K</h3>
                <p className="text-grey-600 text-sm">Founder</p>
              </div>
            </div>

            {/* About Content */}
            <div className="text-center lg:text-left">
              <h2 className="text-4xl font-bold text-grey-900 mb-4">About Our Team</h2>
              <p className="text-lg text-grey-700 leading-relaxed mb-6">
                We are a team of passionate professionals with expertise in <span className="text-brown-600 font-medium">AI, Automation, Multimodal Engineering, Generative AI, and Technology Innovation</span>. 
                We specialize in building intelligent systems and leveraging cutting-edge tools to solve real-world business challenges.
              </p>
              <p className="text-lg text-grey-700 leading-relaxed mb-8">
                With a strong foundation in <span className="font-medium text-brown-700">prompt engineering, machine learning, 
                agentic AI, multimodal systems, and AI automation</span>, our mission is to deliver impactful solutions that drive 
                efficiency, scalability, and innovation for businesses and individuals.
              </p>
            </div>

            {/* Contact Information */}
            <div className="bg-white border border-brown-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-grey-900 mb-4">Get In Touch</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-brown-600" />
                  <a href="mailto:keerthijai909@gmail.com" className="text-grey-700 hover:text-brown-700 transition-colors">
                    keerthijai909@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-brown-600" />
                  <a href="tel:+918072163133" className="text-grey-700 hover:text-brown-700 transition-colors">
                    +91 8072163133
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-brown-600" />
                  <span className="text-grey-700">Chennai, India</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Linkedin className="w-5 h-5 text-brown-600" />
                  <a 
                    href="https://www.linkedin.com/in/jai-keerthi-03931b341" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-grey-700 hover:text-brown-700 transition-colors"
                  >
                    linkedin.com/in/jai-keerthi-03931b341
                  </a>
                </div>
              </div>

              <motion.button
                className="w-full mt-6 btn-primary flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Let's Discuss Your Project</span>
              </motion.button>
            </div>
          </motion.div>

          {/* Right Column - About Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Mission & Vision */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-brown-50 to-grey-50 border border-brown-100 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="w-6 h-6 text-brown-600" />
                  <h3 className="text-xl font-bold text-grey-900">Mission</h3>
                </div>
                <p className="text-grey-700 leading-relaxed">
                  To democratize AI technology by creating intelligent, accessible, and transformative 
                  solutions that empower businesses to achieve unprecedented growth and efficiency.
                </p>
              </div>

              <div className="bg-gradient-to-r from-grey-50 to-brown-50 border border-grey-100 rounded-2xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Eye className="w-6 h-6 text-grey-600" />
                  <h3 className="text-xl font-bold text-grey-900">Vision</h3>
                </div>
                <p className="text-grey-700 leading-relaxed">
                  To be the leading force in AI innovation, creating a future where intelligent 
                  automation enhances human potential and drives positive global impact.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="bg-white border border-brown-100 rounded-xl p-4 text-center shadow-sm"
                >
                  <stat.icon className="w-8 h-8 text-brown-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold gradient-text mb-1">{stat.number}</div>
                  <div className="text-xs text-grey-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Key Achievements */}
            <div className="bg-white border border-brown-100 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-grey-900 mb-4">Key Achievements</h3>
              <ul className="space-y-2">
                {achievements.map((achievement, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-start space-x-2"
                  >
                    <div className="w-1.5 h-1.5 bg-brown-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-grey-700 text-sm">{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Core Skills */}
            <div className="bg-white border border-brown-100 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-grey-900 mb-4">Core Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="px-3 py-1 bg-brown-100 text-brown-700 text-sm rounded-full border border-brown-200"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About