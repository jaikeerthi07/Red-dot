import Groq from 'groq-sdk'
import { NextRequest, NextResponse } from 'next/server'
import { getRelevantKnowledgeBaseSections } from '@/lib/knowledge-base'

// Initialize Groq client
function getGroqClient() {
  if (process.env.GROQ_API_KEY) {
    return new Groq({
      apiKey: process.env.GROQ_API_KEY,
    })
  }
  return null
}

// System prompt for the AI assistant
const SYSTEM_PROMPT = `You are an AI assistant for reddot.org.in, a leading AI development company founded by Jai Keerthi. Your role is to help visitors understand our services, answer questions, and potentially generate leads.

COMPANY INFORMATION:
- Company: reddot.org.in
- Founder: Jai Keerthi (Co-Founder: Jagadish K)
- Specialties: AI Agents, Multi-Agent Systems, AI SaaS Applications, AI Chatbots, AI Education
- Location: Chennai, India
- Contact: keerthijai909@gmail.com, +91 8072163133

SERVICES:
1. AI Agents & Automations - Intelligent autonomous agents for complex tasks
2. AI SaaS Applications - Cloud-based AI-powered software solutions
3. AI Websites & Mobile Apps - Modern applications with AI capabilities
4. AI Content Creation - Intelligent content generation platform
5. AI Internship Program - Hands-on AI experience
6. Embedded Systems with IoT - Smart connected devices
7. AI Data & Analytics - Actionable business insights
8. AI Voice & Vision Apps - Cutting-edge interaction technologies
9. AI Education & Mentorship - Comprehensive AI programs

KEY PROJECTS:
1. Jarvis AI Assistant - Advanced conversational AI
2. Multimodal Medical Diagnosis App - AI-powered healthcare
3. Lead Generation Agent - Intelligent sales automation
4. HR Service System - Comprehensive HR management
5. AI Travel Planning App - Multi-agent travel ecosystem
6. Nano Banana Agent - Social media automation

PERSONALITY:
- Professional yet friendly
- Knowledgeable about AI technologies
- Helpful and solution-oriented
- Enthusiastic about AI potential
- Always ready to connect visitors with Jai Keerthi for serious inquiries

INSTRUCTIONS:
- Always use the provided knowledge base information to answer questions accurately
- Focus on the specific question asked by the user
- Provide detailed, relevant information based on the user's query
- If the user asks about a specific service or project, provide detailed information about it
- Be concise but informative
- Always try to understand the visitor's needs and guide them toward relevant services
- You have access to a detailed knowledge base with comprehensive information about our offerings.`

export async function POST(request: NextRequest) {
  try {
    const { message, conversationId } = await request.json()
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Get relevant knowledge base sections based on the user's query
    const relevantKnowledge = await getRelevantKnowledgeBaseSections(message);

    // Try to use MongoDB service, fallback to in-memory database if MongoDB is not available
    let dbServiceAvailable = false
    let conversationService
    
    try {
      const { dbService } = await import('@/lib/mongodb')
      conversationService = dbService
      dbServiceAvailable = true
    } catch (dbError) {
      console.log('MongoDB service not available, using in-memory database')
      const { conversationService: memConversationService } = await import('@/lib/database')
      conversationService = memConversationService
    }

    const groq = getGroqClient()
    
    if (!groq) {
      // Fallback response when no API key is configured
      console.warn('Groq API key not configured. Using fallback responses.')
      const fallbackResponses = [
        "Thank you for your interest in reddot.co.in! I'm your AI assistant. We specialize in AI agents, multi-agent systems, and intelligent applications. What would you like to know about our services?",
        "Hi there! I'm excited to help you learn about our AI solutions. We offer comprehensive AI development services including chatbots, automation systems, and custom AI applications. How can I assist you today?",
        "Great to meet you! reddot.co.in offers cutting-edge AI solutions with 95% client satisfaction. We've delivered 50+ successful AI projects. What specific AI solution interests you?",
        "Hello! I'd be happy to help with information about our AI services. We specialize in everything from simple chatbots to complex multi-agent systems. Would you like to schedule a consultation with our founder Jai Keerthi?"
      ]
      
      const response = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
      
      // Create conversation in database
      let newConversationId = conversationId || 'demo-' + Date.now()
      
      if (dbServiceAvailable && conversationService) {
        try {
          const conversationResult = await conversationService.createConversation({
            startedAt: new Date(),
            status: 'active'
          })
          
          if (conversationResult && conversationResult.insertedId) {
            newConversationId = conversationResult.insertedId.toString()
          }
          
          // Add user message
          await conversationService.addMessageToConversation(newConversationId, {
            content: message,
            sender: 'user'
          })
          
          // Add AI response
          await conversationService.addMessageToConversation(newConversationId, {
            content: response,
            sender: 'ai'
          })
        } catch (dbError) {
          console.error('Database error:', dbError)
        }
      }
      
      return NextResponse.json({
        response,
        conversationId: newConversationId,
        timestamp: new Date().toISOString(),
        mode: 'demo',
        warning: 'Groq API not configured. Using demo mode.'
      })
    }

    // Create conversation in database
    let newConversationId = conversationId || 'chat-' + Date.now()
    
    if (dbServiceAvailable && conversationService) {
      try {
        const conversationResult = await conversationService.createConversation({
          startedAt: new Date(),
          status: 'active'
        })
        
        if (conversationResult && conversationResult.insertedId) {
          newConversationId = conversationResult.insertedId.toString()
        }
        
        // Add user message
        await conversationService.addMessageToConversation(newConversationId, {
          content: message,
          sender: 'user'
        })
      } catch (dbError) {
        console.error('Database error:', dbError)
      }
    }

    // Create chat completion with Groq
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT + (relevantKnowledge ? `

Use this relevant information from our knowledge base to answer the question:

${relevantKnowledge}` : '')
        },
        {
          role: 'user',
          content: message
        }
      ],
      model: 'llama-3.1-8b-instant', // Using a currently supported model
      temperature: 0.7,
      max_tokens: 1024,
      top_p: 1,
      stream: false
    })

    const response = completion.choices[0]?.message?.content || 'I apologize, but I encountered an error processing your request. Please try again.'

    // Add AI response to database
    if (dbServiceAvailable && conversationService) {
      try {
        await conversationService.addMessageToConversation(newConversationId, {
          content: response,
          sender: 'ai'
        })
      } catch (dbError) {
        console.error('Database error:', dbError)
      }
    }

    return NextResponse.json({
      response,
      conversationId: newConversationId,
      timestamp: new Date().toISOString(),
      mode: 'ai'
    })

  } catch (error) {
    console.error('Chat API Error:', error)
    
    const fallbackResponse = "I'm here to help with your AI project needs! Please contact us directly at keerthijai909@gmail.com or +91 8072163133 for immediate assistance. We specialize in AI agents, multi-agent systems, and intelligent automation solutions."
    
    return NextResponse.json({
      response: fallbackResponse,
      conversationId: 'fallback-' + Date.now(),
      timestamp: new Date().toISOString(),
      mode: 'fallback'
    })
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'AI Assistant is online',
    company: 'reddot.co.in',
    founder: 'Jai Keerthi',
    email: 'keerthijai909@gmail.com',
    phone: '+91 8072163133',
    location: 'Chennai, India',
    model: 'Groq Llama3.1-8B',
    features: [
      'AI consulting',
      'Service information', 
      'Lead qualification',
      'Project discussions',
      'Technical questions'
    ]
  })
}