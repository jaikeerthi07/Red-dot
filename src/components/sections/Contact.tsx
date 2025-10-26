'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Send,
  CheckCircle,
  Linkedin,
  Github,
  Twitter,
  Sparkles,
  Clock,
  Globe
} from 'lucide-react'
import { useChat } from '@/components/chat/ChatProvider'
import { ContactForm } from '@/types'

const Contact = () => {
  const { toggleChat } = useChat()
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: '',
    budget: '',
    timeline: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const services = [
    'AI Agents & Automations',
    'AI SaaS Applications',
    'AI Chatbots',
    'AI Website/Mobile Apps',
    'AI Education & Mentorship',
    'Other'
  ]

  const budgetRanges = [
    '$5K - $10K',
    '$10K - $25K',
    '$25K - $50K',
    '$50K+',
    'Discuss Budget'
  ]

  const timelines = [
    '1-2 weeks',
    '1-2 months',
    '3-6 months',
    '6+ months',
    'Flexible'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
          service: '',
          budget: '',
          timeline: ''
        })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'keerthijai909@gmail.com',
      href: 'mailto:keerthijai909@gmail.com'
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 8072163133',
      href: 'tel:+918072163133'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Chennai, India',
      href: '#'
    },
    {
      icon: Clock,
      label: 'Business Hours',
      value: '9 AM - 6 PM IST',
      href: '#'
    }
  ]

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/jai-keerthi-03931b341', color: 'hover:text-blue-400' },
    { name: 'GitHub', icon: Github, href: 'https://github.com/jaikeerthi', color: 'hover:text-gray-400' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/jaikeerthi', color: 'hover:text-blue-300' },
  ]

  return (
    <section id="contact" className="section-padding bg-white">
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
              Get In Touch
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Ready to Start Your AI Journey?</span>
          </h2>
          
          <p className="text-xl text-grey-700 max-w-3xl mx-auto">
            Let's discuss how AI can transform your business. Get a free consultation 
            and discover the possibilities that intelligent automation can unlock.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2"
          >
            <div className="bg-white border border-brown-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-grey-900 mb-6">Send us a Message</h3>
              
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircle className="w-16 h-16 text-brown-600 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-grey-900 mb-2">Message Sent Successfully!</h4>
                  <p className="text-grey-700 mb-6">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <motion.button
                    onClick={() => setIsSubmitted(false)}
                    className="btn-secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name, Email, and Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-grey-900 font-medium mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-grey-50 border border-brown-200 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500 text-grey-900 placeholder-grey-500 transition-colors"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-grey-900 font-medium mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-grey-50 border border-brown-200 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500 text-grey-900 placeholder-grey-500 transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-grey-900 font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-grey-50 border border-brown-200 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500 text-grey-900 placeholder-grey-500 transition-colors"
                        placeholder="+91 XXXXXXXXXX"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-grey-900 font-medium mb-2">
                      Your Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-grey-50 border border-brown-200 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500 text-grey-900 placeholder-grey-500 transition-colors resize-none"
                      placeholder="Tell us about your project and how we can help..."
                    />
                  </div>

                  {/* Service, Budget, and Timeline */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="service" className="block text-grey-900 font-medium mb-2">
                        Service Interest
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-grey-50 border border-brown-200 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500 text-grey-900 transition-colors"
                      >
                        <option value="">Select a service</option>
                        {services.map((service) => (
                          <option key={service} value={service}>{service}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="budget" className="block text-grey-900 font-medium mb-2">
                        Budget Range
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-grey-50 border border-brown-200 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500 text-grey-900 transition-colors"
                      >
                        <option value="">Select budget</option>
                        {budgetRanges.map((range) => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="timeline" className="block text-grey-900 font-medium mb-2">
                        Project Timeline
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-grey-50 border border-brown-200 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-brown-500 text-grey-900 transition-colors"
                      >
                        <option value="">Select timeline</option>
                        {timelines.map((timeline) => (
                          <option key={timeline} value={timeline}>{timeline}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary flex items-center justify-center space-x-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Details */}
            <div className="bg-white border border-brown-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-grey-900 mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-brown-100 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-brown-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-grey-500 uppercase tracking-wide">{info.label}</h4>
                        {info.href === '#' ? (
                          <p className="text-grey-900 font-medium mt-1">{info.value}</p>
                        ) : (
                          <a 
                            href={info.href} 
                            className="text-grey-900 font-medium hover:text-brown-600 transition-colors mt-1 inline-block"
                          >
                            {info.value}
                          </a>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-brown-100">
                <h4 className="text-sm font-medium text-grey-500 uppercase tracking-wide mb-4">Connect With Us</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-10 h-10 bg-brown-100 rounded-lg flex items-center justify-center text-brown-600 hover:bg-brown-600 hover:text-white transition-colors ${social.color}`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* AI Chat Widget */}
            <div className="bg-gradient-to-r from-brown-50 to-grey-50 border border-brown-100 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-brown-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-brown-600" />
              </div>
              <h3 className="text-xl font-bold text-grey-900 mb-2">Chat with our AI Assistant</h3>
              <p className="text-grey-700 mb-6">
                Get instant answers to your questions about our services and AI solutions.
              </p>
              <motion.button
                onClick={toggleChat}
                className="btn-primary w-full flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-4 h-4" />
                <span>Start AI Chat</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact