'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  BookOpen,
  User,
  Tag,
  Sparkles,
  Filter
} from 'lucide-react'
import { blogPosts } from '@/data'
import { BlogPost } from '@/types'

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = [
    { id: 'all', name: 'All Posts', count: blogPosts.length },
    { id: 'tutorial', name: 'Tutorials', count: blogPosts.filter(p => p.category === 'tutorial').length },
    { id: 'case-study', name: 'Case Studies', count: blogPosts.filter(p => p.category === 'case-study').length },
    { id: 'guide', name: 'Guides', count: blogPosts.filter(p => p.category === 'guide').length },
    { id: 'news', name: 'News', count: blogPosts.filter(p => p.category === 'news').length },
  ]

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const getCategoryColor = (category: BlogPost['category']) => {
    switch (category) {
      case 'tutorial':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30'
      case 'case-study':
        return 'bg-green-500/20 text-green-300 border-green-500/30'
      case 'guide':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30'
      case 'news':
        return 'bg-orange-500/20 text-orange-300 border-orange-500/30'
      default:
        return 'bg-brown-500/20 text-brown-300 border-brown-500/30'
    }
  }

  return (
    <section id="blog" className="section-padding bg-white">
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
              AI Agents & Multi-Agent Systems Hub
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">AI Agents & Multi-Agent Systems</span>
          </h2>
          
          <p className="text-xl text-grey-700 max-w-3xl mx-auto">
            Master the concepts of AI agents and multi-agent systems with our comprehensive guides. 
            Explore intelligent architectures, coordination protocols, learning mechanisms, and real-world applications.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-300
                ${selectedCategory === category.id
                  ? 'bg-brown-600 border-brown-500 text-white'
                  : 'bg-white border-brown-200 text-grey-700 hover:border-brown-300 hover:text-grey-900'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">{category.name}</span>
              <span className="text-xs bg-brown-100 px-1.5 py-0.5 rounded-full">
                {category.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Featured Post */}
        {filteredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-12"
          >
            <div className="bg-gradient-to-r from-brown-50 to-grey-50 border border-brown-100 rounded-3xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Featured Image */}
                <div className="relative h-64 lg:h-auto">
                  <Image
                    src={filteredPosts[0].image}
                    alt={filteredPosts[0].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-white/60 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-6 left-6">
                    <span className={`
                      inline-block px-3 py-1 rounded-full text-sm font-medium border capitalize
                      ${getCategoryColor(filteredPosts[0].category)}
                    `}>
                      {filteredPosts[0].category.replace('-', ' ')}
                    </span>
                  </div>
                </div>

                {/* Featured Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center space-x-4 text-grey-600 text-sm mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(filteredPosts[0].publishedAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{filteredPosts[0].readTime} min read</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{filteredPosts[0].author}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-bold text-grey-900 mb-4 leading-tight">
                    {filteredPosts[0].title}
                  </h3>

                  <p className="text-grey-700 mb-6 leading-relaxed">
                    {filteredPosts[0].excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {filteredPosts[0].tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center space-x-1 px-2 py-1 bg-brown-100 text-brown-700 text-xs rounded-full"
                      >
                        <Tag className="w-3 h-3" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>

                  <motion.button
                    className="flex items-center space-x-2 text-brown-600 hover:text-brown-700 font-medium group self-start"
                    whileHover={{ x: 5 }}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Explore Complete Guide</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.slice(1).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-white border border-brown-200 rounded-2xl overflow-hidden hover:border-brown-300 transition-all duration-300 card-hover shadow-sm"
              >
                {/* Post Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`
                      inline-block px-2 py-1 rounded-full text-xs font-medium border capitalize
                      ${getCategoryColor(post.category)}
                    `}>
                      {post.category.replace('-', ' ')}
                    </span>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6">
                  <div className="flex items-center space-x-3 text-grey-500 text-xs mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime} min</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-grey-900 mb-3 group-hover:text-brown-700 transition-colors leading-tight">
                    {post.title}
                  </h3>

                  <p className="text-grey-700 text-sm mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-grey-600">By {post.author}</span>
                    <motion.button
                      className="flex items-center space-x-1 text-brown-600 hover:text-brown-700 font-medium text-sm group/btn"
                      whileHover={{ x: 5 }}
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-brown-50 to-grey-50 border border-brown-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-grey-900 mb-4">
              Ready to Build Intelligent Agent Systems?
            </h3>
            <p className="text-grey-700 mb-6 max-w-2xl mx-auto">
              Join our community of AI practitioners and learn to build sophisticated agent systems. 
              Get expert guidance on multi-agent architectures and cutting-edge AI implementations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <motion.button
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Subscribe to Agent Updates
              </motion.button>
              <motion.button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Agent Consulting
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Blog