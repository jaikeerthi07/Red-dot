'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  id: string
  text: string
  sender: 'user' | 'clara'
  timestamp: Date
}

interface VoiceAgentProps {
  isOpen: boolean
  onClose: () => void
}

export default function VoiceAgent({ isOpen, onClose }: VoiceAgentProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [currentInput, setCurrentInput] = useState('')
  const [conversationState, setConversationState] = useState<string>('greeting')
  const [customerData, setCustomerData] = useState<any>({})
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [voiceSettings, setVoiceSettings] = useState({ rate: 0.9, pitch: 1.1, volume: 0.8 })
  const [selectedLanguage, setSelectedLanguage] = useState('en-US')
  const [isRecording, setIsRecording] = useState(false)
  const [conversationHistory, setConversationHistory] = useState<string[]>([])
  const [userPreferences, setUserPreferences] = useState<any>({})
  const [sentiment, setSentiment] = useState<'positive' | 'neutral' | 'negative'>('neutral')
  const [isTyping, setIsTyping] = useState(false)
  const [quickActions, setQuickActions] = useState<string[]>(['Services', 'Pricing', 'Contact', 'Demo'])
  const [screenShareActive, setScreenShareActive] = useState(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>(0)

  // Available languages for voice recognition
  const supportedLanguages = [
    { code: 'en-US', name: 'English (US)', flag: '🇺🇸' },
    { code: 'en-GB', name: 'English (UK)', flag: '🇬🇧' },
    { code: 'es-ES', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr-FR', name: 'French', flag: '🇫🇷' },
    { code: 'de-DE', name: 'German', flag: '🇩🇪' },
    { code: 'it-IT', name: 'Italian', flag: '🇮🇹' },
    { code: 'pt-BR', name: 'Portuguese', flag: '🇧🇷' },
    { code: 'hi-IN', name: 'Hindi', flag: '🇮🇳' },
    { code: 'zh-CN', name: 'Chinese', flag: '🇨🇳' },
    { code: 'ja-JP', name: 'Japanese', flag: '🇯🇵' }
  ]

  // Enhanced conversation capabilities
  const advancedFeatures = {
    emotionDetection: (text: string) => {
      const positiveWords = ['great', 'excellent', 'amazing', 'wonderful', 'perfect', 'love', 'fantastic']
      const negativeWords = ['terrible', 'awful', 'hate', 'worst', 'disappointed', 'frustrated', 'angry']
      
      const lowerText = text.toLowerCase()
      const hasPositive = positiveWords.some(word => lowerText.includes(word))
      const hasNegative = negativeWords.some(word => lowerText.includes(word))
      
      if (hasPositive && !hasNegative) return 'positive'
      if (hasNegative && !hasPositive) return 'negative'
      return 'neutral'
    },
    generatePersonalizedResponse: (userInput: string, history: string[], preferences: any) => {
      const userName = preferences.name || 'there'
      const previousTopics = history.slice(-3).join(' ').toLowerCase()
      
      if (previousTopics.includes('pricing') && userInput.toLowerCase().includes('expensive')) {
        return `I understand cost is a concern, ${userName}. Let me show you our flexible pricing options and payment plans that might work better for your budget.`
      }
      
      if (previousTopics.includes('timeline') && userInput.toLowerCase().includes('urgent')) {
        return `I see this is time-sensitive, ${userName}. Let me connect you with our rapid deployment team who can expedite your project.`
      }
      
      return null
    },
    contextualSuggestions: (currentTopic: string) => {
      const suggestions: { [key: string]: string[] } = {
        'services': ['Tell me about AI agents', 'Show pricing options', 'Schedule consultation', 'View case studies'],
        'pricing': ['Compare packages', 'Custom quote', 'Payment plans', 'ROI calculator'],
        'technical': ['Technology stack', 'Integration options', 'Security features', 'Scalability'],
        'support': ['Contact sales', 'Technical support', 'Documentation', 'Live demo']
      }
      return suggestions[currentTopic] || ['Services', 'Pricing', 'Contact', 'Demo']
    }
  }
  const supportDatabase = {
    services: {
      "ai agents": {
        description: "AI Agents & Automations - Intelligent autonomous agents that handle complex tasks, make decisions, and automate workflows across your business processes.",
        features: ["Multi-agent system architecture", "Natural language processing", "Task automation & workflow optimization", "Real-time decision making", "Integration with existing systems"],
        pricing: "Starting from $5,000 for basic implementation",
        timeline: "2-4 weeks for initial deployment"
      },
      "saas applications": {
        description: "AI SaaS Applications - Cloud-based AI-powered software solutions designed to scale with your business needs and deliver intelligent insights.",
        features: ["Scalable cloud architecture", "AI-powered analytics", "Real-time data processing", "Custom API integrations", "Multi-tenant solutions"],
        pricing: "Starting from $10,000 for custom development",
        timeline: "4-8 weeks for full implementation"
      },
      "chatbots": {
        description: "AI Customer Service Chatbots - Advanced conversational AI powered by Groq API for instant, intelligent customer support and lead generation.",
        features: ["Groq API integration", "Natural conversation flow", "Lead qualification", "Multi-language support", "Human handoff capabilities"],
        pricing: "Starting from $3,000 for basic chatbot",
        timeline: "1-2 weeks for deployment"
      },
      "websites": {
        description: "AI Websites & Mobile Apps - Modern, responsive web and mobile applications enhanced with AI capabilities for superior user experiences.",
        features: ["Responsive design", "AI chatbots integration", "Personalization engines", "Voice & vision AI features", "Cross-platform compatibility"],
        pricing: "Starting from $8,000 for AI-enhanced website",
        timeline: "3-6 weeks for development"
      },
      "education": {
        description: "AI Education & Mentorship - Comprehensive AI education programs and personalized mentorship to accelerate your AI journey.",
        features: ["Personalized learning paths", "1-on-1 mentorship", "Hands-on projects", "Industry certifications", "Career guidance"],
        pricing: "Starting from $500 per month for mentorship",
        timeline: "Flexible scheduling available"
      }
    },
    company: {
      name: "Reddot.co.in",
      founder: "Jai Keerthi",
      email: "keerthijai909@gmail.com",
      phone: "+91 8072163133",
      location: "Chennai, India",
      hours: "9 AM - 6 PM IST, Monday to Friday",
      expertise: "AI Agents, Multi-Agent Systems, SaaS Applications, Machine Learning, and AI Education"
    },
    faqs: {
      "what do you do": "We specialize in AI Agents, Automations, SaaS Applications, and AI Education. We help businesses transform through intelligent automation and custom AI solutions.",
      "pricing": "Our pricing varies by project complexity. AI Chatbots start from $3,000, Websites from $8,000, and SaaS Applications from $10,000. We offer free consultations to discuss your specific needs.",
      "timeline": "Project timelines range from 1-2 weeks for chatbots to 4-8 weeks for complex SaaS applications. We provide detailed timelines during our consultation.",
      "technologies": "We work with Python, React, Node.js, Groq API, TensorFlow, AWS, Docker, and many other cutting-edge technologies.",
      "support": "We provide 24/7 support for all deployed systems, regular maintenance, updates, and ongoing optimization."
    }
  }

  // Clara's conversation scripts
  const scripts = {
    greeting: "Hello! Welcome to Reddot. My name is Clara. How may I assist you today?",
    generalInquiry: "I'd be happy to help! We specialize in AI Agents, SaaS Applications, Chatbots, AI-enhanced Websites, and AI Education. Which area interests you most?",
    servicesOverview: "We offer five main services: 1) AI Agents & Automations starting from $5,000, 2) AI SaaS Applications from $10,000, 3) AI Chatbots from $3,000, 4) AI Websites & Mobile Apps from $8,000, and 5) AI Education & Mentorship from $500/month. Which would you like to know more about?",
    orderSupport: "I can help with that. May I have your order number or account ID so I can assist you more efficiently?",
    orderFound: "Thank you! I'm retrieving your information… One moment, please. I see that your order status is active. Is there anything specific you'd like me to help with regarding this?",
    orderNotFound: "No worries! Can you provide your name and email address associated with your account so I can locate your details?",
    complaint: "I'm sorry to hear that you're experiencing this. Can you briefly describe the issue so I can assist you or connect you with the right team?",
    complaintEscalation: "Thank you for sharing the details. I'm escalating this to our support team, and someone will reach out to you shortly. Can I confirm your contact details to ensure a quick response?",
    feedback: "We really appreciate your feedback! Could you please share your thoughts? Your input helps us improve our services.",
    contactInfo: `You can reach us at keerthijai909@gmail.com or call +91 8072163133. We're located in Bangalore, India, and our business hours are 9 AM - 6 PM IST, Monday to Friday. Would you like me to schedule a consultation for you?`,
    consultation: "Great! I'd be happy to schedule a free consultation. Please provide your name, email, and preferred time, and our founder Jai Keerthi will personally discuss your AI needs.",
    fallback: "I'm sorry, I didn't quite catch that. Could you please rephrase your question? I can help with information about our AI services, pricing, timelines, or schedule a consultation.",
    goodbye: "Thank you for contacting Reddot. If you have any more questions, feel free to reach out anytime. Have a wonderful day!"
  }

  // Initialize speech synthesis
  useEffect(() => {
    if (typeof window !== 'undefined') {
      synthRef.current = window.speechSynthesis
      
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
        recognitionRef.current.lang = 'en-US'
        
        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript
          handleUserInput(transcript)
          setIsListening(false)
        }
        
        recognitionRef.current.onerror = () => setIsListening(false)
        recognitionRef.current.onend = () => setIsListening(false)
      }
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addClaraMessage(scripts.greeting)
        speakText(scripts.greeting)
      }, 500)
    }
  }, [isOpen])

  const addMessage = (text: string, sender: 'user' | 'clara') => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, message])
  }

  const addClaraMessage = (text: string) => addMessage(text, 'clara')
  const addUserMessage = (text: string) => addMessage(text, 'user')

  // Enhanced speech synthesis with better voice selection
  const speakText = (text: string) => {
    if (synthRef.current) {
      synthRef.current.cancel() // Stop any ongoing speech
      setIsSpeaking(true)
      
      if (videoRef.current && isVideoLoaded) {
        videoRef.current.play().catch(console.log)
        startLipSyncAnimation()
      }
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = voiceSettings.rate
      utterance.pitch = voiceSettings.pitch
      utterance.volume = voiceSettings.volume
      utterance.lang = selectedLanguage
      
      const voices = synthRef.current.getVoices()
      
      // Prioritize female voices for Clara
      const preferredVoices = voices.filter(voice => 
        voice.lang.startsWith(selectedLanguage.split('-')[0]) &&
        (voice.name.toLowerCase().includes('female') || 
         voice.name.toLowerCase().includes('zira') ||
         voice.name.toLowerCase().includes('hazel') ||
         voice.name.toLowerCase().includes('samantha') ||
         voice.name.toLowerCase().includes('karen') ||
         voice.name.toLowerCase().includes('moira') ||
         voice.name.toLowerCase().includes('tessa'))
      )
      
      if (preferredVoices.length > 0) {
        utterance.voice = preferredVoices[0]
      } else {
        // Fallback to any voice with the selected language
        const languageVoices = voices.filter(voice => 
          voice.lang.startsWith(selectedLanguage.split('-')[0])
        )
        if (languageVoices.length > 0) {
          utterance.voice = languageVoices[0]
        }
      }
      
      utterance.onend = () => {
        setIsSpeaking(false)
        stopLipSyncAnimation()
        if (videoRef.current) {
          videoRef.current.pause()
        }
      }
      
      utterance.onerror = () => {
        setIsSpeaking(false)
        stopLipSyncAnimation()
      }
      
      synthRef.current.speak(utterance)
    }
  }

  // Audio visualization and lip sync animation
  const startLipSyncAnimation = () => {
    if (!canvasRef.current) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Create speaking animation effect
      const time = Date.now() * 0.005
      const amplitude = 10
      const frequency = 0.5
      
      ctx.strokeStyle = '#10b981'
      ctx.lineWidth = 2
      ctx.beginPath()
      
      for (let x = 0; x < canvas.width; x += 2) {
        const y = canvas.height / 2 + Math.sin(time + x * frequency) * amplitude
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      
      ctx.stroke()
      animationFrameRef.current = requestAnimationFrame(animate)
    }
    
    animate()
  }
  
  const stopLipSyncAnimation = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    }
  }

  // Enhanced speech recognition with better error handling
  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true)
      setIsRecording(true)
      recognitionRef.current.lang = selectedLanguage
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
      setIsRecording(false)
    }
  }

  // Enhanced user input processing with personalization
  const handleUserInput = (input: string) => {
    addUserMessage(input)
    
    // Update conversation history
    setConversationHistory(prev => [...prev.slice(-5), input])
    
    // Detect sentiment
    const detectedSentiment = advancedFeatures.emotionDetection(input)
    setSentiment(detectedSentiment)
    
    // Extract user preferences
    const lowerInput = input.toLowerCase()
    if (lowerInput.includes('my name is') || lowerInput.includes('i am')) {
      const nameMatch = input.match(/(?:my name is|i am)\s+([a-zA-Z]+)/i)
      if (nameMatch) {
        setUserPreferences((prev: any) => ({ ...prev, name: nameMatch[1] }))
      }
    }
    
    // Update quick actions based on context
    const newSuggestions = advancedFeatures.contextualSuggestions(conversationState)
    setQuickActions(newSuggestions)
    
    // Process with enhanced logic
    processUserIntent(input)
  }

  // Screen sharing capability
  const startScreenShare = async () => {
    try {
      if ('getDisplayMedia' in navigator.mediaDevices) {
        const stream = await (navigator.mediaDevices as any).getDisplayMedia({
          video: true,
          audio: false
        })
        setScreenShareActive(true)
        
        // Handle stream end
        stream.getVideoTracks()[0].onended = () => {
          setScreenShareActive(false)
        }
        
        addClaraMessage("Great! I can see your screen now. How can I help you with what you're showing me?")
        speakText("Great! I can see your screen now. How can I help you with what you're showing me?")
      }
    } catch (error) {
      console.error('Screen sharing not available:', error)
      addClaraMessage("I'm sorry, screen sharing isn't available on this device. But I'm still here to help you with any questions!")
    }
  }

  // Voice settings adjustment
  const adjustVoiceSettings = (setting: string, value: number) => {
    setVoiceSettings(prev => ({ ...prev, [setting]: value }))
  }

  // Quick action handler
  const handleQuickAction = (action: string) => {
    setCurrentInput(action)
    handleUserInput(action)
  }

  const processUserIntent = (input: string) => {
    let response = ''
    let newState = conversationState
    const lowerInput = input.toLowerCase()

    // Service-specific inquiries
    if (lowerInput.includes('agent') || lowerInput.includes('automation')) {
      const service = supportDatabase.services['ai agents']
      response = `${service.description} Key features include: ${service.features.slice(0, 3).join(', ')}. ${service.pricing} with ${service.timeline}. Would you like more details or a consultation?`
      newState = 'serviceDetails'
    } else if (lowerInput.includes('saas') || lowerInput.includes('software') || lowerInput.includes('application')) {
      const service = supportDatabase.services['saas applications']
      response = `${service.description} Key features: ${service.features.slice(0, 3).join(', ')}. ${service.pricing} with ${service.timeline}. Shall I schedule a consultation?`
      newState = 'serviceDetails'
    } else if (lowerInput.includes('chatbot') || lowerInput.includes('chat') || lowerInput.includes('bot')) {
      const service = supportDatabase.services['chatbots']
      response = `${service.description} Features: ${service.features.slice(0, 3).join(', ')}. ${service.pricing} with ${service.timeline}. Would you like to see a demo?`
      newState = 'serviceDetails'
    } else if (lowerInput.includes('website') || lowerInput.includes('mobile') || lowerInput.includes('app')) {
      const service = supportDatabase.services['websites']
      response = `${service.description} Features: ${service.features.slice(0, 3).join(', ')}. ${service.pricing} with ${service.timeline}. Interested in a consultation?`
      newState = 'serviceDetails'
    } else if (lowerInput.includes('education') || lowerInput.includes('learning') || lowerInput.includes('mentor') || lowerInput.includes('training')) {
      const service = supportDatabase.services['education']
      response = `${service.description} What we offer: ${service.features.slice(0, 3).join(', ')}. ${service.pricing} with ${service.timeline}. Ready to start your AI journey?`
      newState = 'serviceDetails'
    } 
    // General service inquiry
    else if (lowerInput.includes('service') || lowerInput.includes('what do you do') || lowerInput.includes('offer') || lowerInput.includes('provide')) {
      response = scripts.servicesOverview
      newState = 'servicesOverview'
    }
    // Pricing inquiries
    else if (lowerInput.includes('price') || lowerInput.includes('cost') || lowerInput.includes('budget') || lowerInput.includes('how much')) {
      response = supportDatabase.faqs.pricing + " Which service are you most interested in?"
      newState = 'pricing'
    }
    // Contact and consultation
    else if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('phone') || lowerInput.includes('reach')) {
      response = scripts.contactInfo
      newState = 'contact'
    } else if (lowerInput.includes('consultation') || lowerInput.includes('meeting') || lowerInput.includes('discuss') || lowerInput.includes('schedule')) {
      response = scripts.consultation
      newState = 'consultation'
    }
    // Timeline inquiries
    else if (lowerInput.includes('time') || lowerInput.includes('when') || lowerInput.includes('how long') || lowerInput.includes('duration')) {
      response = supportDatabase.faqs.timeline + " What type of project are you considering?"
      newState = 'timeline'
    }
    // Technology inquiries
    else if (lowerInput.includes('technology') || lowerInput.includes('tech') || lowerInput.includes('tools') || lowerInput.includes('platform')) {
      response = supportDatabase.faqs.technologies + " Is there a specific technology you're interested in?"
      newState = 'technology'
    }
    // Order support
    else if (lowerInput.includes('order') || lowerInput.includes('purchase') || lowerInput.includes('tracking')) {
      response = scripts.orderSupport
      newState = 'orderSupport'
    }
    // Issues and complaints
    else if (lowerInput.includes('problem') || lowerInput.includes('issue') || lowerInput.includes('complaint') || lowerInput.includes('wrong')) {
      response = scripts.complaint
      newState = 'complaint'
    }
    // Feedback
    else if (lowerInput.includes('feedback') || lowerInput.includes('suggestion') || lowerInput.includes('improve')) {
      response = scripts.feedback
      newState = 'feedback'
    }
    // Goodbye
    else if (lowerInput.includes('bye') || lowerInput.includes('goodbye') || lowerInput.includes('thank you') || lowerInput.includes('thanks')) {
      response = scripts.goodbye
      newState = 'goodbye'
    }
    // Context-based responses
    else if (conversationState === 'orderSupport' && (lowerInput.includes('#') || /\d{6,}/.test(input))) {
      response = scripts.orderFound
      newState = 'orderFound'
    } else if (conversationState === 'complaint') {
      response = scripts.complaintEscalation
      newState = 'complaintEscalation'
    } else if (conversationState === 'consultation' && (lowerInput.includes('@') || lowerInput.includes('yes') || lowerInput.includes('schedule'))) {
      response = "Perfect! I've noted your interest in a consultation. Jai Keerthi will reach out to you within 24 hours to discuss your AI needs. Is there anything specific you'd like him to focus on during the call?"
      newState = 'consultationScheduled'
    }
    // Fallback
    else {
      response = scripts.fallback
      newState = 'fallback'
    }

    setConversationState(newState)
    
    setTimeout(() => {
      addClaraMessage(response)
      speakText(response)
    }, 1000)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && videoRef.current) {
      const url = URL.createObjectURL(file)
      videoRef.current.src = url
      videoRef.current.onloadeddata = () => {
        setIsVideoLoaded(true)
      }
    }
  }

  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentInput.trim()) {
      handleUserInput(currentInput.trim())
      setCurrentInput('')
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg h-[700px] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-lg">
                  {isVideoLoaded ? (
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover rounded-full"
                      muted
                      loop
                      onError={() => setIsVideoLoaded(false)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center relative">
                      <span className="text-white font-bold text-xl">C</span>
                      <button
                        onClick={triggerFileUpload}
                        className="absolute inset-0 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                        title="Upload Clara video"
                      >
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
                {isSpeaking && (
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ repeat: Infinity, duration: 0.5 }}
                      className="w-3 h-3 bg-white rounded-full"
                    />
                  </motion.div>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-lg">Clara</h3>
                <p className="text-sm text-slate-300">Customer Support Agent</p>
                <div className="flex items-center space-x-1 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-400">Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {!isVideoLoaded && (
                <button
                  onClick={triggerFileUpload}
                  className="text-amber-400 hover:text-amber-300 transition-colors p-1 rounded"
                  title="Upload Clara video"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              )}
              <button
                onClick={onClose}
                className="text-slate-300 hover:text-white transition-colors p-1 rounded"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/webm,video/ogg"
            onChange={handleFileUpload}
            className="hidden"
          />

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-slate-800 text-white'
                      : 'bg-slate-100 text-slate-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-60 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="border-t border-slate-200 p-4">
            {/* Quick Actions */}
            {quickActions.length > 0 && (
              <div className="mb-4">
                <p className="text-xs text-slate-500 mb-2">Quick Actions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(action)}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded-full transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Voice Settings */}
            <div className="mb-4">
              <details className="group">
                <summary className="text-xs text-slate-500 cursor-pointer hover:text-slate-700 list-none flex items-center gap-1">
                  ⚙️ Voice Settings
                  <svg className="w-3 h-3 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-2 space-y-2 bg-slate-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-slate-600">Speed:</label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={voiceSettings.rate}
                      onChange={(e) => adjustVoiceSettings('rate', parseFloat(e.target.value))}
                      className="w-20 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-xs text-slate-500">{voiceSettings.rate}x</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-slate-600">Pitch:</label>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.1"
                      value={voiceSettings.pitch}
                      onChange={(e) => adjustVoiceSettings('pitch', parseFloat(e.target.value))}
                      className="w-20 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-xs text-slate-500">{voiceSettings.pitch}x</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs text-slate-600">Volume:</label>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={voiceSettings.volume}
                      onChange={(e) => adjustVoiceSettings('volume', parseFloat(e.target.value))}
                      className="w-20 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <span className="text-xs text-slate-500">{Math.round(voiceSettings.volume * 100)}%</span>
                  </div>
                </div>
              </details>
            </div>
            
            <form onSubmit={handleTextSubmit} className="flex space-x-2">
              <input
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-500"
              />
              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isListening
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
                disabled={isSpeaking}
              >
                {isListening ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                  >
                    🔴
                  </motion.div>
                ) : (
                  '🎤'
                )}
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors"
                disabled={!currentInput.trim()}
              >
                Send
              </button>
            </form>
            <p className="text-xs text-slate-500 mt-2 text-center">
              🎤 Voice • 🌐 Multi-language • 📱 Screen share • ⚙️ Voice settings
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}