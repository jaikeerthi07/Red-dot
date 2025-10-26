'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Sparkles, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Twitter,
  MessageCircle
} from 'lucide-react'
import { useChat } from '@/components/chat/ChatProvider'

const Footer = () => {
  const { toggleChat } = useChat()

  const footerSections = [
    {
      title: 'Services',
      links: [
        { name: 'AI Agents & Automations', href: '#services' },
        { name: 'AI SaaS Applications', href: '#services' },
        { name: 'AI Chatbots', href: '#services' },
        { name: 'AI Education', href: '#services' },
      ]
    },
    {
      title: 'Projects',
      links: [
        { name: 'Jarvis AI Assistant', href: '#projects' },
        { name: 'Medical Diagnosis App', href: '#projects' },
        { name: 'Lead Generation Agent', href: '#projects' },
        { name: 'HR Service System', href: '#projects' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '#blog' },
        { name: 'Case Studies', href: '#blog' },
        { name: 'Tutorials', href: '#blog' },
        { name: 'Documentation', href: '#blog' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '#contact' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
      ]
    }
  ]

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/jai-keerthi-03931b341' },
    { name: 'GitHub', icon: Github, href: 'https://github.com/jaikeerthi' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/jaikeerthi' },
  ]

  return (
    <footer className="bg-grey-100 border-t border-brown-200">
      <div className="container-width section-padding">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2">
                <div className="relative w-8 h-8">
                  <Image
                    src="/images/logo/reddot-robot.svg"
                    alt="Reddot AI Logo"
                    width={32}
                    height={32}
                    className="w-full h-full"
                  />
                </div>
                <span className="text-xl font-bold text-brown-600">
                  RED DOT
                </span>
              </div>
              <p className="text-grey-700 text-sm max-w-sm">
                Innovating with AI Agents, Multi-Agent Systems, and Intelligent Applications powered by Groq AI. Your trusted partner in AI transformation.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-grey-700 text-sm">
                  <Mail className="w-4 h-4" />
                  <span>keerthijai909@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2 text-grey-700 text-sm">
                  <Phone className="w-4 h-4" />
                  <span>+91 8072163133</span>
                </div>
                <div className="flex items-center space-x-2 text-grey-700 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>Chennai, India</span>
                </div>
              </div>

              {/* Chat Button */}
              <motion.button
                onClick={toggleChat}
                className="flex items-center space-x-2 bg-brown-600 hover:bg-brown-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-sm mt-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-4 h-4" />
                <span>💬 Chat with AI Assistant</span>
              </motion.button>
            </motion.div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="text-grey-900 font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-grey-700 hover:text-brown-600 transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-brown-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-grey-700 text-sm"
            >
              © 2024 <span className="text-brown-600 font-semibold">RED DOT</span>. All rights reserved. Built with ❤️ by Jai Keerthi
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center space-x-4"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-grey-700 hover:text-brown-600 transition-colors duration-300"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer