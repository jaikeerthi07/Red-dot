'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { ChatMessage, Conversation } from '@/types'

interface ChatContextType {
  isOpen: boolean
  toggleChat: () => void
  messages: ChatMessage[]
  sendMessage: (content: string) => Promise<void>
  isLoading: boolean
  currentConversation: Conversation | null
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null)

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      conversationId: currentConversation?.id || 'temp'
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: content,
          conversationId: currentConversation?.id
        }),
      })

      if (!response.ok) {
        throw new Error(`Failed to send message: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: 'ai',
        timestamp: new Date(),
        conversationId: data.conversationId
      }

      setMessages(prev => [...prev, aiMessage])
      
      if (!currentConversation) {
        setCurrentConversation({
          id: data.conversationId,
          messages: [userMessage, aiMessage],
          startedAt: new Date(),
          status: 'active'
        })
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
        timestamp: new Date(),
        conversationId: currentConversation?.id || 'temp'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }, [currentConversation])

  const value: ChatContextType = {
    isOpen,
    toggleChat,
    messages,
    sendMessage,
    isLoading,
    currentConversation
  }

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}