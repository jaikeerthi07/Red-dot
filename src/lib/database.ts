// Simple in-memory database for development
// This will be replaced with MongoDB in production

interface ChatMessage {
  id: string
  content: string
  sender: 'user' | 'ai'
  timestamp: Date
  conversationId: string
}

interface Conversation {
  id: string
  userId?: string
  messages: ChatMessage[]
  startedAt: Date
  status: 'active' | 'closed'
  metadata?: any
}

interface ContactFormData {
  name: string
  email: string
  message: string
  service?: string
  budget?: string
  timeline?: string
  submittedAt: Date
}

interface Lead {
  id: string
  name?: string
  email?: string
  phone?: string
  source: string
  conversationId?: string
  createdAt: Date
  status: 'new' | 'contacted' | 'qualified' | 'converted'
}

// In-memory storage (will reset on server restart)
class InMemoryDatabase {
  private conversations: Map<string, Conversation> = new Map()
  private contactForms: ContactFormData[] = []
  private leads: Lead[] = []

  // Conversation methods
  createConversation(conversationData: Partial<Conversation>): Conversation {
    const id = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const conversation: Conversation = {
      id,
      startedAt: new Date(),
      status: 'active',
      messages: [],
      ...conversationData
    }
    this.conversations.set(id, conversation)
    return conversation
  }

  getConversation(id: string): Conversation | undefined {
    return this.conversations.get(id)
  }

  addMessageToConversation(conversationId: string, messageData: {
    content: string
    sender: 'user' | 'ai'
  }): ChatMessage {
    const conversation = this.conversations.get(conversationId)
    if (!conversation) {
      throw new Error('Conversation not found')
    }

    const message: ChatMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      content: messageData.content,
      sender: messageData.sender,
      timestamp: new Date(),
      conversationId
    }

    conversation.messages.push(message)
    this.conversations.set(conversationId, conversation)
    
    return message
  }

  // Contact form methods
  saveContactForm(formData: Omit<ContactFormData, 'submittedAt'>): ContactFormData {
    const contactForm: ContactFormData = {
      ...formData,
      submittedAt: new Date()
    }
    this.contactForms.push(contactForm)
    return contactForm
  }

  // Lead methods
  createLead(leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>): Lead {
    const lead: Lead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      status: 'new',
      ...leadData
    }
    this.leads.push(lead)
    return lead
  }

  // Analytics methods
  getStats() {
    return {
      totalConversations: this.conversations.size,
      activeConversations: Array.from(this.conversations.values()).filter(c => c.status === 'active').length,
      totalContactForms: this.contactForms.length,
      totalLeads: this.leads.length,
      newLeads: this.leads.filter(l => l.status === 'new').length
    }
  }

  // Get all data (for debugging)
  getAllData() {
    return {
      conversations: Array.from(this.conversations.values()),
      contactForms: this.contactForms,
      leads: this.leads
    }
  }
}

// Export singleton instance
export const database = new InMemoryDatabase()

// Helper functions for easier usage
export const conversationService = {
  create: (data?: Partial<Conversation>) => database.createConversation(data || {}),
  get: (id: string) => database.getConversation(id),
  addMessage: (conversationId: string, message: { content: string; sender: 'user' | 'ai' }) =>
    database.addMessageToConversation(conversationId, message)
}

export const contactService = {
  save: (formData: Omit<ContactFormData, 'submittedAt'>) => database.saveContactForm(formData)
}

export const leadService = {
  create: (leadData: Omit<Lead, 'id' | 'createdAt' | 'status'>) => database.createLead(leadData)
}

export const analyticsService = {
  getStats: () => database.getStats(),
  getAllData: () => database.getAllData()
}

// Enhanced customer service responses for fallback
export const customerServiceResponses = {
  greeting: [
    "Hello! I'm Red Dot's AI assistant. How can I help you with our AI services today?",
    "Hi there! Welcome to Red Dot. I'm here to answer your questions about our AI solutions.",
    "Greetings! I'm your AI assistant at Red Dot. What would you like to know about our services?"
  ],
  services: [
    "We offer a comprehensive range of AI services including Machine Learning development, Natural Language Processing, Computer Vision, AI chatbots, predictive analytics, and custom AI solutions tailored to your business needs.",
    "Our AI services include: 1) Custom AI Development 2) Machine Learning Solutions 3) NLP & Chatbots 4) Computer Vision 5) Data Analytics 6) AI Consulting. Which one interests you most?",
    "Red Dot specializes in cutting-edge AI technologies. We provide end-to-end AI solutions from consultation and development to deployment and maintenance."
  ],
  pricing: [
    "Our pricing is customized based on your specific requirements and project scope. We offer competitive rates and flexible pricing models. Would you like to schedule a consultation to discuss your needs?",
    "We provide tailored pricing for each project. Factors include complexity, timeline, and required features. Contact us for a detailed quote that fits your budget.",
    "Our pricing varies by project complexity and requirements. We offer both fixed-price and hourly models. Let's discuss your project to provide an accurate estimate."
  ],
  contact: [
    "You can reach us at: Email: info@reddot.org.in | Phone: +91 XXXXX XXXXX | Or fill out our contact form and we'll get back to you within 24 hours.",
    "We'd love to hear from you! Contact us via email at info@reddot.org.in or use our contact form on the website. Our team responds quickly to all inquiries."
  ],
  about: [
    "Red Dot is a leading AI solutions company founded with a vision to democratize artificial intelligence for businesses of all sizes. We combine cutting-edge technology with practical business applications.",
    "We're passionate about AI innovation and helping businesses harness the power of artificial intelligence. Our team of experts delivers custom solutions that drive real business value."
  ],
  technical: [
    "We work with cutting-edge technologies including TensorFlow, PyTorch, OpenAI GPT models, LangChain, React, Next.js, Python, and cloud platforms like AWS, Azure, and Google Cloud.",
    "Our technical stack includes modern AI frameworks, cloud-native architectures, and scalable deployment solutions. We ensure your AI systems are robust, secure, and production-ready."
  ],
  portfolio: [
    "Our portfolio includes AI chatbots for customer service, predictive analytics for e-commerce, computer vision for quality control, NLP solutions for content analysis, and custom ML models for various industries.",
    "We've successfully delivered AI projects across healthcare, finance, retail, manufacturing, and technology sectors. Each project is tailored to solve specific business challenges."
  ],
  process: [
    "Our development process includes: 1) Discovery & Requirements Analysis 2) AI Strategy & Architecture Design 3) Development & Training 4) Testing & Validation 5) Deployment & Integration 6) Ongoing Support & Optimization.",
    "We follow an agile methodology with regular client communication, iterative development, and continuous testing to ensure your AI solution meets expectations."
  ],
  timeline: [
    "Project timelines vary based on complexity. Simple AI integrations: 2-4 weeks, Custom ML models: 6-12 weeks, Complex AI systems: 3-6 months. We provide detailed timelines during consultation.",
    "We work efficiently while maintaining quality. Most projects see initial results within the first few weeks, with full deployment typically completed within our estimated timeline."
  ],
  support: [
    "We provide comprehensive post-deployment support including monitoring, maintenance, updates, and scaling assistance. Our support plans ensure your AI systems continue performing optimally.",
    "Our support includes 24/7 monitoring, regular performance optimization, bug fixes, feature updates, and technical assistance. We're committed to your long-term success."
  ],
  industries: [
    "We serve various industries including Healthcare (diagnosis, patient management), Finance (fraud detection, trading), Retail (recommendation systems), Manufacturing (quality control), and Education (personalized learning).",
    "Our AI solutions are industry-agnostic but tailored to specific sector needs. We understand regulatory requirements and industry best practices for each domain we serve."
  ],
  demo: [
    "I'd be happy to arrange a demo! We can showcase our AI capabilities, discuss your specific use case, and demonstrate how our solutions can benefit your business. Would you like to schedule a meeting?",
    "We offer personalized demos tailored to your industry and requirements. Contact us to schedule a demonstration where we'll show you relevant AI solutions in action."
  ],
  security: [
    "Security is paramount in our AI solutions. We implement end-to-end encryption, secure data handling, compliance with GDPR/CCPA, regular security audits, and follow industry best practices for AI security.",
    "Our AI systems are built with security-first architecture, including data privacy protection, secure model deployment, access controls, and compliance with international security standards."
  ],
  default: [
    "I'm here to help with information about Red Dot's AI services, pricing, team, and how we can assist your business. What specific information would you like to know?",
    "Feel free to ask me about our AI services, projects, team, or how we can help transform your business with AI technology.",
    "I can provide information about our AI solutions, answer questions about our services, or help you get in touch with our team. How can I assist you today?"
  ]
}

// Function to get intelligent fallback response
export function getIntelligentResponse(userMessage: string): string {
  const message = userMessage.toLowerCase()
  
  // Keywords mapping to response categories
  const keywordMap = {
    greeting: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
    services: ['service', 'services', 'ai', 'machine learning', 'ml', 'nlp', 'computer vision', 'chatbot', 'analytics'],
    pricing: ['price', 'pricing', 'cost', 'budget', 'quote', 'estimate', 'fee', 'charge'],
    contact: ['contact', 'reach', 'phone', 'email', 'call', 'message'],
    about: ['about', 'company', 'who are you', 'founded', 'team', 'background'],
    technical: ['technology', 'tech', 'stack', 'framework', 'python', 'tensorflow', 'pytorch'],
    portfolio: ['portfolio', 'projects', 'work', 'examples', 'case studies', 'clients'],
    process: ['process', 'methodology', 'approach', 'how do you work', 'development'],
    timeline: ['timeline', 'time', 'duration', 'how long', 'delivery', 'completion'],
    support: ['support', 'maintenance', 'help', 'assistance', 'after deployment'],
    industries: ['industry', 'industries', 'sectors', 'healthcare', 'finance', 'retail'],
    demo: ['demo', 'demonstration', 'show', 'preview', 'trial', 'test'],
    security: ['security', 'secure', 'privacy', 'data protection', 'compliance']
  }
  
  // Find the best matching category
  let bestMatch = 'default'
  let maxMatches = 0
  
  for (const [category, keywords] of Object.entries(keywordMap)) {
    const matches = keywords.filter(keyword => message.includes(keyword)).length
    if (matches > maxMatches) {
      maxMatches = matches
      bestMatch = category
    }
  }
  
  // Get random response from the category
  const responses = customerServiceResponses[bestMatch as keyof typeof customerServiceResponses]
  return responses[Math.floor(Math.random() * responses.length)]
}