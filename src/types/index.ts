export interface ChatMessage {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
  conversationId: string
}

export interface Conversation {
  id: string
  messages: ChatMessage[]
  startedAt: Date
  status: 'active' | 'completed' | 'archived'
}

export interface ContactForm {
  name: string
  email: string
  subject?: string
  message: string
  phone?: string
  company?: string
  service?: string
  budget?: string
  timeline?: string
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  demoUrl?: string
  githubUrl?: string
  category: string
  status: 'completed' | 'in-progress' | 'planned'
  features?: string[]
  detailedDescription?: string
  challenges?: string[]
  solutions?: string[]
  results?: string[]
}

export interface Service {
  id: string
  title: string
  description: string
  detailedDescription: string
  icon: string
  features: string[]
  category: string
  benefits: string[]
  useCases: string[]
  techStack: string[]
  price?: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  author: string
  publishedAt: string
  tags: string[]
  readTime: number
  category: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatar: string
  image?: string
  rating: number
}