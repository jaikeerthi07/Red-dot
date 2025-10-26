// Temporarily disabled for deployment
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  return NextResponse.json({
    response: "Thank you for your interest in reddot.co.in! Our AI chat functionality is currently being updated. Please contact us directly at jai@reddot.co.in or call +91 8072163133 for immediate assistance with your AI project needs.",
    conversationId: 'demo',
    timestamp: new Date().toISOString(),
    mode: 'maintenance'
  })
}

export async function GET() {
  return NextResponse.json({
    status: 'AI Assistant is temporarily offline for maintenance',
    contact: 'jai@reddot.co.in',
    phone: '+91 8072163133'
  })
}