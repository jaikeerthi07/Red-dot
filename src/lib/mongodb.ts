import { MongoClient, Db, ObjectId } from 'mongodb'

// Check if we're in a development environment without MongoDB
const isDevelopment = process.env.NODE_ENV === 'development'
const hasMongoURI = !!process.env.MONGODB_URI

// Only throw error in production if MongoDB URI is missing
if (!isDevelopment && !hasMongoURI) {
  console.warn('Missing MONGODB_URI environment variable. Using in-memory database fallback.')
}

let client: MongoClient | null = null
let clientPromise: Promise<MongoClient> | null = null

// Only initialize MongoDB connection if URI is provided
if (process.env.MONGODB_URI) {
  const uri = process.env.MONGODB_URI
  const options = {}

  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    let globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>
    }

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options)
      globalWithMongo._mongoClientPromise = client.connect()
    }
    clientPromise = globalWithMongo._mongoClientPromise
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
  }
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise

// Database helper functions
export async function getDatabase(): Promise<Db | null> {
  if (!clientPromise) {
    return null
  }
  
  try {
    const client = await clientPromise
    return client.db(process.env.MONGODB_DB_NAME || 'reddot-website')
  } catch (error) {
    console.error('Failed to connect to database:', error)
    return null
  }
}

// Collection names
export const COLLECTIONS = {
  USERS: 'users',
  CONVERSATIONS: 'conversations',
  MESSAGES: 'messages',
  LEADS: 'leads',
  CONTACT_FORMS: 'contact_forms',
  BLOG_POSTS: 'blog_posts',
  PROJECTS: 'projects',
  TESTIMONIALS: 'testimonials'
} as const

// Database operations for the website
export class DatabaseService {
  private db: Db | null = null

  async getDb(): Promise<Db | null> {
    if (!this.db && clientPromise) {
      try {
        this.db = await getDatabase()
      } catch (error) {
        console.error('Database connection error:', error)
        this.db = null
      }
    }
    return this.db
  }

  // User operations
  async createUser(userData: {
    name?: string
    email?: string
    phone?: string
    createdAt?: Date
    isLead?: boolean
    leadSource?: string
  }) {
    const db = await this.getDb()
    if (!db) {
      console.log('Database not available, skipping user creation')
      return null
    }
    
    try {
      const result = await db.collection(COLLECTIONS.USERS).insertOne({
        ...userData,
        createdAt: userData.createdAt || new Date(),
        conversationIds: [],
        isLead: userData.isLead || false
      })
      return result
    } catch (error) {
      console.error('Error creating user:', error)
      return null
    }
  }

  async findUserByEmail(email: string) {
    const db = await this.getDb()
    if (!db) {
      console.log('Database not available, skipping user lookup')
      return null
    }
    
    try {
      return await db.collection(COLLECTIONS.USERS).findOne({ email })
    } catch (error) {
      console.error('Error finding user:', error)
      return null
    }
  }

  // Conversation operations
  async createConversation(conversationData: {
    userId?: string
    startedAt?: Date
    status?: 'active' | 'closed'
    metadata?: any
  }) {
    const db = await this.getDb()
    if (!db) {
      console.log('Database not available, skipping conversation creation')
      return null
    }
    
    try {
      const result = await db.collection(COLLECTIONS.CONVERSATIONS).insertOne({
          ...conversationData,
          startedAt: conversationData.startedAt || new Date(),
          status: conversationData.status || 'active',
          messages: []
      })
      return result
    } catch (error) {
      console.error('Error creating conversation:', error)
      return null
    }
  }

  async addMessageToConversation(conversationId: string, messageData: {
    content: string
    sender: 'user' | 'ai'
    timestamp?: Date
  }) {
    const db = await this.getDb()
    if (!db) {
      console.log('Database not available, skipping message addition')
      return null
    }
    
    try {
      const message = {
          id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          ...messageData,
          timestamp: messageData.timestamp || new Date()
      }

      await db.collection(COLLECTIONS.CONVERSATIONS).updateOne(
          { _id: new ObjectId(conversationId) },
          { $push: { messages: message } as any }
      )

      return message
    } catch (error) {
      console.error('Error adding message to conversation:', error)
      return null
    }
  }

  // Lead operations
  async createLead(leadData: {
    name: string
    email: string
    phone?: string
    source: string
    service?: string
    budget?: string
    timeline?: string
    message?: string
    conversationId?: string
  }) {
    const db = await this.getDb()
    if (!db) {
      console.log('Database not available, skipping lead creation')
      return null
    }
    
    try {
      const result = await db.collection(COLLECTIONS.LEADS).insertOne({
        ...leadData,
        createdAt: new Date(),
        status: 'new',
        followUpRequired: true
      })
      return result
    } catch (error) {
      console.error('Error creating lead:', error)
      return null
    }
  }

  // Contact form operations
  async saveContactForm(formData: {
    name: string
    email: string
    message: string
    service?: string
    budget?: string
    timeline?: string
  }) {
    const db = await this.getDb()
    if (!db) {
      console.log('Database not available, skipping contact form save')
      return null
    }
    
    try {
      const result = await db.collection(COLLECTIONS.CONTACT_FORMS).insertOne({
        ...formData,
        submittedAt: new Date(),
        status: 'new',
        source: 'website_contact_form'
      })
      return result
    } catch (error) {
      console.error('Error saving contact form:', error)
      return null
    }
  }

  // Analytics operations
  async getConversationStats() {
    const db = await this.getDb()
    if (!db) {
      console.log('Database not available, returning default stats')
      return {
        totalConversations: 0,
        activeConversations: 0,
        totalLeads: 0,
        newLeads: 0
      }
    }
    
    try {
      const totalConversations = await db.collection(COLLECTIONS.CONVERSATIONS).countDocuments()
      const activeConversations = await db.collection(COLLECTIONS.CONVERSATIONS).countDocuments({ status: 'active' })
      const totalLeads = await db.collection(COLLECTIONS.LEADS).countDocuments()
      const newLeads = await db.collection(COLLECTIONS.LEADS).countDocuments({ status: 'new' })

      return {
        totalConversations,
        activeConversations,
        totalLeads,
        newLeads
      }
    } catch (error) {
      console.error('Error getting conversation stats:', error)
      return {
        totalConversations: 0,
        activeConversations: 0,
        totalLeads: 0,
        newLeads: 0
      }
    }
  }
}

// Export singleton instance
export const dbService = new DatabaseService()